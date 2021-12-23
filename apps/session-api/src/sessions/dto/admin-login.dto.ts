import { BaseDto } from '../../../../common/src/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class AdminLoginDto extends BaseDto {
  @ApiProperty({ description: '관리자 이메일', example: 'mion@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '관리자 비밀번호', example: '1111' })
  @IsString()
  @Matches(/^[a-zA-Z-0-9]*$/)
  password: string;
}
