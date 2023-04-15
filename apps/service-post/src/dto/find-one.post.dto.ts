import { IsString } from 'class-validator';

export class FindOnePostDto {
  @IsString()
  postId: string;
}
