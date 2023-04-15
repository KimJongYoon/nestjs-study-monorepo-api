import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResponse } from '../../../../libs/core/src';
import { PassJwtGuard } from '../../../../libs/core/src/meta/public.meta';
import { EditResponse } from '../../../../libs/core/src/response/edit.response';
import { AdminAccountService } from './admin-account.service';
import { CreateAdminAccountDto } from './dto/create.admin-account.dto';
import { EditAdminAccountDto } from './dto/edit.admin-account.dto';

@ApiTags('관리자 계정 관리')
@ApiBearerAuth('access-token')
@ApiExtraModels(CreateResponse, EditResponse)
@ApiInternalServerErrorResponse({ description: '서버 에러' })
@Controller('account')
export class AdminAccountController {
  constructor(private readonly adminAccountService: AdminAccountService) {}

  @Post()
  @PassJwtGuard()
  @ApiOperation({ summary: '관리자 계정 생성' })
  @ApiCreatedResponse({ type: CreateResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async create(@Body() dto: CreateAdminAccountDto) {
    const data = await this.adminAccountService.create(dto);
    return new CreateResponse(data.email);
  }

  @Put(':email')
  @ApiOperation({ summary: '관리자 계정 정보 수정' })
  @ApiOkResponse({ type: EditResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async edit(@Param('email') email: string, @Body() dto: EditAdminAccountDto) {
    const data = await this.adminAccountService.edit(dto, email);
    return new EditResponse(data.email);
  }
}
