import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

/**
 * API 내에서 발생하는 예외 처리
 */
export class NatsApiException {
  static exception(params: {
    error: any;
    serviceName: string;
    internalErrorMessage: string;
  }) {
    const { error, serviceName, internalErrorMessage } = params;

    error.stack = error?.customStack ?? error?.stack;

    Logger.error(error.message, error?.stack, serviceName);

    if (error?.status) {
      throw new HttpException(error.message, error.status);
    }
    throw new InternalServerErrorException(internalErrorMessage);
  }
}
