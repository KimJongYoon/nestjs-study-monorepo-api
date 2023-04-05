import { NatsRecordBuilder } from '@nestjs/microservices';
import * as nats from 'nats';

export class NatsBuildHelper {
  static buildNatsRecord(payload: any, request: any): any {
    const headers = nats.headers();
    const requestId = request?.requestId ?? '';
    headers.set('request-id', requestId.toString());

    const record = new NatsRecordBuilder(payload).setHeaders(headers).build();
    return record;
  }
}
