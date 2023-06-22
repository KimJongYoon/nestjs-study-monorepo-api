import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
  PaginationDto,
  PaginationOrderDto,
} from '../../../../../libs/core/src';

export class FindAllViewUsinPostDto extends IntersectionType(
  PaginationDto,
  PaginationOrderDto,
) {
  @IsString()
  @IsOptional()
  searchKeyword: string;
}
