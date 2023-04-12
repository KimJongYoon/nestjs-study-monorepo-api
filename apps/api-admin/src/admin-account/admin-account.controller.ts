import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResponse } from '../../../../libs/core/src';
import { PassJwtGuard } from '../../../../libs/core/src/meta/public.meta';
import { AdminAccountService } from './admin-account.service';
import { CreateAdminAccountDto } from './dto/create.admin-account.dto';

@ApiTags('관리자 계정 관리')
@ApiExtraModels()
@ApiBearerAuth('access-token')
@ApiInternalServerErrorResponse({ description: '서버 에러' })
@Controller('admin-account')
export class AdminAccountController {
  constructor(private readonly adminAccountService: AdminAccountService) {}

  @Post()
  @PassJwtGuard()
  @ApiOperation({ summary: '사용자 생성' })
  @ApiOkResponse({ type: CreateResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async create(@Body() dto: CreateAdminAccountDto) {
    const data = await this.adminAccountService.create(dto);
    return new CreateResponse(data.email);
  }
}
