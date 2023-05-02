import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOrderDto } from '../../../../../libs/core/src';

export class FindAllUsinPostDto extends PaginationOrderDto {
  @ApiProperty({
    example: '',
    description: '검색어',
    required: false,
  })
  @IsString()
  @IsOptional()
  searchKeyword: string;
}
