import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
import { CreateResponse, FindOneResponse } from '../../../../libs/core/src';
import { EditResponse } from '../../../../libs/core/src/response/edit.response';
import { FindAllResponse } from '../../../../libs/core/src/response/find-all.response';
import { RemoveResponse } from '../../../../libs/core/src/response/remove.response';
import { ApiFindAllResponse } from '../../../../libs/core/src/swagger/find-all.decorator';
import { ApiFindOneResponse } from '../../../../libs/core/src/swagger/find-one.decorator';
import { AdminAccount } from '../../../../libs/database/src/usin/generated/client';
import { AdminUser } from '../common/decorator/admin-account.decorator';
import { AdminPostService } from './admin-post.service';
import { CreateAdminPostDto } from './dto/create.admin-post.dto';
import { EditAdminPostDto } from './dto/edit.admin-post.dto';
import { FindAllAdminPostDto } from './dto/find-all.admin-post.dto';
import { FindAllAdminPostResponse } from './response/find-all.admin-post.response';
import { FindOneAdminPostResponse } from './response/find-one.admin-post.response';

@ApiTags('포스트 관리')
@ApiBearerAuth('access-token')
@ApiExtraModels(
  FindAllResponse,
  FindAllAdminPostResponse,
  FindOneAdminPostResponse,
)
@ApiInternalServerErrorResponse({ description: '서버 에러' })
@Controller('post')
export class AdminPostController {
  constructor(private readonly adminPostService: AdminPostService) {}

  @Get()
  @ApiOperation({ summary: '포스트 목록 조회' })
  @ApiFindAllResponse(FindAllAdminPostResponse)
  async findAll(@Query() dto: FindAllAdminPostDto) {
    const [datas, count] = await this.adminPostService.findAll(dto);

    return new FindAllResponse(
      dto,
      count,
      datas.map((data) => new FindAllAdminPostResponse(data)),
    );
  }

  @Get(':postId')
  @ApiOperation({ summary: '포스트 상세 조회' })
  @ApiFindOneResponse(FindOneAdminPostResponse)
  async findOne(@Param('postId') postId: string) {
    const data = await this.adminPostService.findOne(postId);

    return new FindOneResponse(new FindOneAdminPostResponse(data));
  }

  @Post()
  @ApiOperation({ summary: '포스트 생성' })
  @ApiCreatedResponse({ type: CreateResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async create(
    @Body() dto: CreateAdminPostDto,
    @AdminUser() adminAccount: AdminAccount,
  ) {
    const data = await this.adminPostService.create(dto, adminAccount.email);
    return new CreateResponse(data.id);
  }

  @Put(':postId')
  @ApiOperation({ summary: '포스트 수정' })
  @ApiOkResponse({ type: EditResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async edit(
    @Param('postId') postId: string,
    @Body() dto: EditAdminPostDto,
    @AdminUser() adminAccount: AdminAccount,
  ) {
    const data = await this.adminPostService.edit(dto, {
      postId,
      adminEmail: adminAccount.email,
    });
    return new EditResponse(data.id);
  }

  @Delete(':postId')
  @ApiOperation({ summary: '포스트 삭제' })
  @ApiOkResponse({ type: RemoveResponse })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async remove(
    @Param('postId') postId: string,
    @AdminUser() adminAccount: AdminAccount,
  ) {
    const data = await this.adminPostService.remove({
      postId,
      adminEmail: adminAccount.email,
    });
    return new RemoveResponse(data.id);
  }
}
