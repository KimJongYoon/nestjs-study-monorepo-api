import { IsString } from 'class-validator';

export class FindOneViewAdminPostDto {
  @IsString()
  postId: string;
}
