import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../../libs/core/src/dto/pagination.dto';

export class FindAllAdminPostDto extends PaginationDto {
  @ApiProperty({
    example: '',
    description: '검색어',
    required: false,
  })
  @IsString()
  @IsOptional()
  searchKeyword: string;
}
