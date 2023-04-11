import { ApiProperty } from '@nestjs/swagger';

export class FindOneResponse {
  @ApiProperty({
    example: 200,
    description: 'http 상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '정상적으로 조회되었습니다.',
    description: '메시지',
  })
  message: string;

  @ApiProperty({
    description: '상세 정보 조회 정보',
  })
  item: object;

  constructor(item: object) {
    this.statusCode = 200;
    this.message = '정상적으로 조회되었습니다.';
    this.item = item;
  }
}
