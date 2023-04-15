import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CommonEntity } from '../../../../../core/src';
import { Post } from '../../generated/client';

export class PostModel extends CommonEntity implements Post {
  @ApiProperty({
    example: '0747ffab-03d7-44ae-81c3-761e2da68c67',
    description: '포스트 ID',
  })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({
    example: 'mion@gmail.com',
    description: '관리자 계정 이메일',
  })
  @IsString()
  adminEmail: string;

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
    example: true,
    description: '게시 여부',
  })
  @IsBoolean()
  published: boolean;

  @ApiProperty({
    example: 'https://thumbnail.url',
    description: '썸네일 URL',
  })
  @IsString()
  thumbnailUrl: string;

  @ApiProperty({
    example: 1,
    description: '조회수',
  })
  @IsNumber()
  readCount: number;
}
