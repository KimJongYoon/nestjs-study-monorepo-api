import { BaseDto } from '../../../../common/src/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoleDto extends BaseDto {
  @ApiProperty({ description: '권한코드', example: 20 })
  @IsNumber()
  role_code: number;

  @ApiProperty({ description: '권한명', example: '관리자' })
  @IsString()
  role_name: string;
}
