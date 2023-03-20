import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiUsinService {
  async info(): Promise<string> {
    return `usin-api ${process.env.npm_package_version}`;
  }
}
