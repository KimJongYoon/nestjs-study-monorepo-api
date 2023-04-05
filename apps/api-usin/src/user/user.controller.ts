import { Body, Controller, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PassJwtGuard } from '../../../../libs/core/src/meta/public.meta';
import { CreateResponse } from '../../../../libs/core/src/response/create.response';
import { EditResponse } from '../../../../libs/core/src/response/edit.response';
import { CreateUserDto } from '../../../service-user/src/dto/create.user.dto';
import { EditUserDto } from './dto/edit.user.dto';
import { UserService } from './user.service';

@ApiTags('사용자 관리')
@ApiExtraModels(CreateResponse, EditResponse)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @PassJwtGuard()
  @ApiOperation({ summary: '사용자 생성' })
  @ApiOkResponse({ type: CreateResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiInternalServerErrorResponse({ description: '서버 에러' })
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return new CreateResponse(data.uid);
  }

  @Patch(':uid')
  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiOkResponse({ type: EditResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiInternalServerErrorResponse({ description: '서버 에러' })
  async edit(@Body() dto: EditUserDto) {
    return undefined;
  }
}
