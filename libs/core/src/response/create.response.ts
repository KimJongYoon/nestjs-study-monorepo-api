import { ApiProperty } from '@nestjs/swagger';

export class CreateResponse {
  @ApiProperty({
    example: 200,
    description: 'http 상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '정상적으로 등록되었습니다.',
    description: '메시지',
  })
  message: string;

  @ApiProperty({
    example: 'adsh123jkdfjk',
    description: '등록된 데이터의 ID',
  })
  dataId: string;
  constructor(dataId: string) {
    this.dataId = dataId;
    this.message = '정상적으로 등록되었습니다.';
    this.statusCode = 200;
  }
}
