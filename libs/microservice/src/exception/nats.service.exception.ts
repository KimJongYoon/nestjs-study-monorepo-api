import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

/**
 * 마이크로서비스 내에서 발생하는 예외 처리
 */
export class NatsServiceException {
  static exception(params: {
    error: any;
    serviceName: string;
    internalErrorMessage: string;
  }) {
    const { error, serviceName, internalErrorMessage } = params;

    if (error instanceof BadRequestException) throw error;
    Logger.error(error, error?.stack, serviceName);
    throw new InternalServerErrorException(internalErrorMessage);
  }
}
