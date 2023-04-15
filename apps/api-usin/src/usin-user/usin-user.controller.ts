import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindOneResponse } from '../../../../libs/core/src';
import { PassJwtGuard } from '../../../../libs/core/src/meta/public.meta';
import { CreateResponse } from '../../../../libs/core/src/response/create.response';
import { EditResponse } from '../../../../libs/core/src/response/edit.response';
import { ApiFindOneResponse } from '../../../../libs/core/src/swagger/find-one.decorator';
import { User } from '../../../../libs/database/src/usin/generated/client';
import { CreateUserDto } from '../../../service-user/src/dto/create.user.dto';
import { UsinUser } from '../common/decorator/usin-user.decorator';
import { EditUsinUserDto } from './dto/edit.usin-user.dto';
import { FindOneUsinUserResponse } from './response/find-one.usin-user.response';
import { UsinUserService } from './usin-user.service';

@ApiTags('사용자 관리')
@ApiExtraModels(
  FindOneResponse,
  CreateResponse,
  EditResponse,

  FindOneUsinUserResponse,
)
@ApiBearerAuth('access-token')
@ApiInternalServerErrorResponse({ description: '서버 에러' })
@Controller('user')
export class UsinUserController {
  constructor(private readonly userService: UsinUserService) {}

  @Get(':uid')
  @ApiOperation({ summary: '사용자 상세 조회' })
  @ApiFindOneResponse(FindOneUsinUserResponse)
  async findOne(@Param('uid') uid: string) {
    const data = await this.userService.findOne(uid);
    return new FindOneResponse(data);
  }

  @Post()
  @PassJwtGuard()
  @ApiOperation({ summary: '사용자 생성' })
  @ApiOkResponse({ type: CreateResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return new CreateResponse(data.uid);
  }

  @Put()
  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiOkResponse({ type: EditResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async edit(@Body() dto: EditUsinUserDto, @UsinUser() user: User) {
    const uid = user.uid;
    const data = await this.userService.edit(dto, { uid });
    return new EditResponse(data.uid);
  }
}
