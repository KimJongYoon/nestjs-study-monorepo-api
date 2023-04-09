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
import { CreateUserDto } from '../../../service-user/src/dto/create.user.dto';
import { EditUserDto } from './dto/edit.user.dto';
import { FindOneUserResponse } from './response/find-one.user.response';
import { UserService } from './user.service';

@ApiTags('사용자 관리')
@ApiExtraModels(
  FindOneResponse,
  CreateResponse,
  EditResponse,

  FindOneUserResponse,
)
@ApiBearerAuth('accessToken')
@ApiInternalServerErrorResponse({ description: '서버 에러' })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uid')
  @ApiOperation({ summary: '사용자 상세 조회' })
  @ApiFindOneResponse(FindOneUserResponse)
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

  @Put(':uid')
  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiOkResponse({ type: EditResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async edit(@Param('uid') uid: string, @Body() dto: EditUserDto) {
    const data = await this.userService.edit(dto, { uid });
    return new EditResponse(data.uid);
  }
}
