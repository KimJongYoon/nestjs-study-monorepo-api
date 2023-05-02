import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindOneResponse } from '../../../../libs/core/src';
import { FindAllResponse } from '../../../../libs/core/src/response/find-all.response';
import { ApiFindAllResponse } from '../../../../libs/core/src/swagger/find-all.decorator';
import { ApiFindOneResponse } from '../../../../libs/core/src/swagger/find-one.decorator';
import { FindAllUsinPostDto } from './dto/find-all.usin-post.dto';
import { FindAllUsinPostResponse } from './response/find-all.usin-post.response';
import { FindOneUsinPostResponse } from './response/find-one.usin-post.response';
import { UsinPostService } from './usin-post.service';

@ApiTags('포스트 서비스')
@ApiExtraModels(
  FindAllResponse,
  FindOneResponse,
  FindAllUsinPostResponse,
  FindOneUsinPostResponse,
)
@ApiBearerAuth('access-token')
@ApiInternalServerErrorResponse({ description: '서버 에러' })
@Controller('posts')
export class UsinPostController {
  constructor(private readonly usinPostService: UsinPostService) {}

  @Get()
  @ApiOperation({ summary: '포스트 목록 조회' })
  @ApiFindAllResponse(FindAllUsinPostResponse)
  async findAll(@Query() dto: FindAllUsinPostDto) {
    const [datas, count] = await this.usinPostService.findAll(dto);

    return new FindAllResponse(
      dto,
      count,
      datas.map((data) => new FindAllUsinPostResponse(data)),
    );
  }

  @Get(':postId')
  @ApiOperation({ summary: '포스트 상세 조회' })
  @ApiFindOneResponse(FindOneUsinPostResponse)
  async findOne(@Param('postId') postId: string) {
    const data = await this.usinPostService.findOne(postId);

    return new FindOneResponse(new FindOneUsinPostResponse(data));
  }
}
