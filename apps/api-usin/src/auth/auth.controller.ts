import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResponse } from '../../../../libs/core/src';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.auth.dto';

@ApiTags('인증 관리')
@ApiExtraModels(CreateResponse)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: CreateResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiInternalServerErrorResponse({ description: '서버 에러' })
  async login(@Body() dto: LoginAuthDto) {
    // TODO jwt 토큰 발급

    return 'jwt token';
  }

  // TODO Jwt 토큰 재발급
}
