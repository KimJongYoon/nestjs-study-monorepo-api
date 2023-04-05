import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateResponse, LoginResponse } from '../../../../libs/core/src';
import { PassJwtGuard } from '../../../../libs/core/src/meta/public.meta';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.auth.dto';
import { UsinLoginGuard } from './guard/usin-login.guard';
import { LoginAuthResponse } from './response/login.auth.response';

@ApiTags('인증 관리')
@ApiExtraModels(LoginResponse, CreateResponse, LoginAuthResponse)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PassJwtGuard()
  @UseGuards(UsinLoginGuard)
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({
    description: '정상적으로 로그인됨',
    schema: {
      allOf: [
        { $ref: getSchemaPath(LoginResponse) },
        {
          properties: {
            item: {
              $ref: getSchemaPath(LoginAuthResponse),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiInternalServerErrorResponse({ description: '서버 에러' })
  async login(@Body() dto: LoginAuthDto) {
    const tokens = await this.authService.signIn(dto);

    const responseData = new LoginAuthResponse(tokens);
    const response = new LoginResponse(responseData);
    response.message = '정상적으로 로그인 되었습니다.';

    return response;
  }

  // TODO Jwt 토큰 재발급
}
