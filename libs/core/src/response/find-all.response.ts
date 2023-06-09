import { ApiProperty } from '@nestjs/swagger';

export class FindAllResponse {
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
    example: 0,
    description: '페이지',
  })
  page: number;

  @ApiProperty({
    example: 5,
    description: '페이지 크기',
  })
  size: number;

  @ApiProperty({
    example: 10,
    description: '데이터 개수',
  })
  count: number;

  @ApiProperty({
    description: '데이터 목록',
  })
  items: object[];

  constructor(
    pagination: { page: number; size: number },
    items: object[],
    count: number,
  ) {
    this.statusCode = 200;
    this.message = '정상적으로 조회되었습니다.';
    this.items = items;
    this.count = count;
    this.page = pagination.page;
    this.size = pagination.size;
  }
}
