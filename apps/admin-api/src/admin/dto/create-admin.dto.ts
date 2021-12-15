import { BaseDto } from '../../../../common/src/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class CreateAdminDto extends BaseDto {
  @ApiProperty({ description: '이메일', example: 'mion@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호', example: '1111' })
  @IsString()
  password: string;

  @ApiProperty({ description: '권한', example: { role_code: 20 } })
  @IsObject()
  role: Role;
}
