import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../libs/core/src/dto/pagination.dto';

export class FindAllPostDto extends PaginationDto {
  @IsString()
  @IsOptional()
  searchKeyword: string;
}
