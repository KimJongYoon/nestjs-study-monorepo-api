import {
  BadRequestException,
  HttpException,
  HttpStatus,
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
    httpStatus?: HttpStatus;
  }) {
    const { error, serviceName, internalErrorMessage, httpStatus } = params;
    Logger.error(error, error?.stack, serviceName);

    if (Object.values(HttpStatus).includes(httpStatus)) {
      throw new HttpException(internalErrorMessage, httpStatus);
    }
    if (error instanceof BadRequestException) throw error;
    throw new InternalServerErrorException(internalErrorMessage);
  }
}
