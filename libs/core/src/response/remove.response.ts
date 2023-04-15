import { ApiProperty } from '@nestjs/swagger';

export class RemoveResponse {
  @ApiProperty({
    example: 200,
    description: 'http 상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '정상적으로 삭제되었습니다.',
    description: '메시지',
  })
  message: string;

  @ApiProperty({
    example: 'adsh123jkdfjk',
    description: '삭제된 데이터의 ID',
  })
  dataId: string;
  constructor(dataId: string) {
    this.statusCode = 200;
    this.message = '정상적으로 삭제되었습니다.';
    this.dataId = dataId;
  }
}
