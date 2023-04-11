import { NatsContext, NatsRecordBuilder } from '@nestjs/microservices';
import * as nats from 'nats';
import { NatsHeaderEnum } from '../enum/nats.header.enum';

export class NatsBuildHelper {
  static buildNatsRecord(params: {
    payload: any;
    request?: any;
    context?: NatsContext;
  }): any {
    const { payload, request, context } = params;

    const headers = nats.headers();

    const requestId =
      request?.requestId ??
      context.getHeaders().get(NatsHeaderEnum.REQUEST_ID) ??
      '';

    headers.set(NatsHeaderEnum.REQUEST_ID, requestId.toString());

    const record = new NatsRecordBuilder(payload).setHeaders(headers).build();
    return record;
  }
}
