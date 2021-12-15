import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(httpStatus: HttpStatus, message: string) {
    super(message, httpStatus);
  }
}
