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
import { LoginAuthResponse } from '../../../api-usin/src/usin-auth/response/login.auth.response';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginAuthDto } from './dto/admin-login.auth.dto';
import { AdminAccountLoginGuard } from './guard/admin-account-login.guard';
import { AdminLoginAuthResponse } from './response/admin-login.auth.response';

@ApiTags('인증 관리')
@ApiExtraModels(
  LoginResponse,
  CreateResponse,
  LoginAuthResponse,
  AdminLoginAuthResponse,
)
@Controller('auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @PassJwtGuard()
  @UseGuards(AdminAccountLoginGuard)
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
              $ref: getSchemaPath(AdminLoginAuthResponse),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiInternalServerErrorResponse({ description: '서버 에러' })
  async login(@Body() dto: AdminLoginAuthDto) {
    const tokens = await this.adminAuthService.signIn(dto);

    const responseData = new AdminLoginAuthResponse(tokens);
    const response = new LoginResponse(responseData);
    response.message = '정상적으로 로그인 되었습니다.';

    return response;
  }
}
