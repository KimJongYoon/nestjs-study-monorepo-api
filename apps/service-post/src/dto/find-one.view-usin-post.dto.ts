import { IsString } from 'class-validator';

export class FindOneViewUsinPostDto {
  @IsString()
  postId: string;
}
