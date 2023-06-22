import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../../libs/core/src/dto/pagination.dto';

export class FindAllViewAdminPostDto extends PaginationDto {
  @IsString()
  @IsOptional()
  searchKeyword: string;
}
