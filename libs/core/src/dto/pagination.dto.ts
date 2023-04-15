import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 0,
    description: '페이지',
    required: true,
  })
  @IsNumber()
  @Min(0)
  page: number;

  @ApiProperty({
    example: 5,
    description: '페이지당 데이터 수',
    required: true,
  })
  @IsNumber()
  @Min(1)
  @Max(1000)
  size: number;
}
