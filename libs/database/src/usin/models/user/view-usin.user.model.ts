import { ApiProperty } from '@nestjs/swagger';
import { ViewUsinUser } from '../../generated/client';

export class ViewUsinUserModel implements ViewUsinUser {
  @ApiProperty({
    example: 'kakao:123456',
    description: '사용자 아이디',
  })
  uid: string;
  @ApiProperty({
    example: 'mion@google.com',
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    example: 'abc123456!',
    description: '비밀번호',
  })
  password: string;

  @ApiProperty({
    example: '미온',
    description: '닉네임',
  })
  nick_name: string;

  @ApiProperty({
    description: '등록일시',
  })
  created_at: Date;

  @ApiProperty({
    example: '비고',
    description: '비고',
  })
  remark: string;
}
