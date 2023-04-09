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
    example: '미온',
    description: '닉네임',
  })
  nickName: string;

  @ApiProperty({
    description: '등록일시',
  })
  createdAt: Date;
}
