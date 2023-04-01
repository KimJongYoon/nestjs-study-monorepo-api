import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResponse } from '../../../../libs/core/src/response/create.response';
import { CreateUserDto } from '../../../service-user/src/dto/create.user.dto';
import { UserService } from './user.service';

@ApiTags('사용자 관리')
@ApiExtraModels(CreateResponse)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '사용자 생성' })
  @ApiOkResponse({ type: CreateResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiInternalServerErrorResponse({ description: '서버 에러' })
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return new CreateResponse(data.uid);
  }
}
