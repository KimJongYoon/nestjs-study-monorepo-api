import { Logger } from '@nestjs/common';
import { ClientNats, ReadPacket, WritePacket } from '@nestjs/microservices';
import { RequestHelper } from '../../../core/src';
import { NatsHeaderEnum } from '../enum/nats.header.enum';

export class NatsCustomClient extends ClientNats {
  /**
   * 메시지 전송
   * @param partialPacket
   * @param callback
   * @returns
   */
  protected publish(
    partialPacket: ReadPacket,
    callback: (packet: WritePacket) => any,
  ): () => void {
    const options = this.options;
    const requestTime = RequestHelper.createRequestTime();

    // 패킷 전송 로그 출력
    this.printSendLog(partialPacket, { options });

    // 패킷 수신 로그 출력
    const fnCallback = this.printReceiveLog(callback, {
      options,
      partialPacket,
      requestTime,
    });

    const response = super.publish(partialPacket, fnCallback);
    return response;
  }

  /**
   * 이벤트 전송
   * @param packet
   */
  protected dispatchEvent(packet: ReadPacket): Promise<any> {
    const options = this.options;

    // 전송 로그 출력
    this.printSendLog(packet, { options });

    return super.dispatchEvent(packet);
  }

  /**
   * 패킷 전송 로그 출력
   * @param partialPacket
   */
  private printSendLog(
    partialPacket: ReadPacket<any>,
    params: { options: any },
  ) {
    const { options } = params;

    const packetHeaders = partialPacket.data.headers;
    const requestId = packetHeaders.get(NatsHeaderEnum.REQUEST_ID);

    // Nats Client 생성 시 옵션으로 전달한 헤더
    const optionsHeaders = options.headers;
    const version = optionsHeaders[NatsHeaderEnum.VERSION_SERVER];

    Logger.log(
      `================ NatsClient SEND [REQUEST ID: ${requestId}] ================ 
      VERSION : [ ${version} ]
      CHANNEL : [ ${partialPacket.pattern} ]
      SEND_PACKET : [ ${JSON.stringify(partialPacket.data.data)} ]`,
    );
  }

  /**
   * 패킷 수신 로그 출력
   * @param requestId
   * @param callback
   * @returns
   */
  private printReceiveLog(
    callback: (packet: WritePacket) => any,
    params: {
      partialPacket: any;
      options: any;
      requestTime: number;
    },
  ) {
    const { partialPacket, options, requestTime } = params;

    const packetHeaders = partialPacket.data.headers;
    const requestId = packetHeaders.get(NatsHeaderEnum.REQUEST_ID);

    return (packet: WritePacket) => {
      Logger.log(
        `================ NatsClient RECEIVE [REQUEST ID: ${requestId}] ${
          Date.now() - requestTime
        }ms ================
        RECEIVE_PACKET : [ ${JSON.stringify(packet)} ]`,
      );
      return callback(packet);
    };
  }
}
