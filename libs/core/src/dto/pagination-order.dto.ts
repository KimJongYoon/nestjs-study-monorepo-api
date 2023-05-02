import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class PaginationOrderDto extends PaginationDto {
  @ApiProperty({
    example: 'createdAt',
    description: `정렬 조건 필드`,
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  orderBy: string;

  @ApiProperty({
    example: 'desc',
    description: '정렬 방식',
    required: false,
  })
  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  orderByDirection: 'asc' | 'desc';
}
