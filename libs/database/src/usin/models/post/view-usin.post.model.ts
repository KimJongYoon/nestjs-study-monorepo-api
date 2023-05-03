import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonEntity } from '../../../../../core/src';
import { ViewUsinPost } from '../../generated/client';

export class ViewUsinPostModel
  extends PickType(CommonEntity, ['createdAt', 'createdBy'])
  implements ViewUsinPost
{
  @ApiProperty({
    example: '0747ffab-03d7-44ae-81c3-761e2da68c67',
    description: '포스트 ID',
  })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({
    example: '포스트 제목 입니다.',
    description: '제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '포스트 컨텐츠 입니다.',
    description: '컨텐츠',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'https://thumbnail.url',
    description: '썸네일 URL',
  })
  @IsString()
  thumbnailUrl: string;
}