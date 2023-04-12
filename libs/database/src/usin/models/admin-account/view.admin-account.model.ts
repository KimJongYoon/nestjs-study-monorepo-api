import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ViewAdminAccount } from '../../generated/client';

export class ViewAdminAccountModel implements ViewAdminAccount {
  @ApiProperty({
    example: 'mion@gmail.com',
    description: '관리자 이메일',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '관리자-미온',
    description: '닉네임',
  })
  @IsString()
  nickName: string;

  @ApiProperty({
    description: '등록일시',
    required: false,
  })
  createdAt: Date | null;

  @ApiProperty({
    example: '등록자',
    description: '등록자',
    required: true,
  })
  createdBy: string;

  @ApiProperty({
    example: '비고',
    description: '비고',
    required: false,
  })
  @IsString()
  remark: string;
}
