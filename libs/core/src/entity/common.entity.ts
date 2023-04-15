import { ApiProperty } from '@nestjs/swagger';
import { BooleanTypes } from '../../../database/src/usin/generated/client';

export class CommonEntity {
  @ApiProperty({
    description: '등록일시',
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    example: '등록자',
    description: '등록자',
    required: true,
  })
  createdBy: string;

  @ApiProperty({
    description: '수정일시',
    required: false,
  })
  updatedAt: Date | null;

  @ApiProperty({
    example: '수정자',
    description: '수정자',
    required: true,
  })
  updatedBy: string;

  @ApiProperty({
    description: '삭제일시',
    required: false,
  })
  deletedAt: Date | null;

  @ApiProperty({
    example: '삭제자',
    description: '삭제자',
    required: false,
  })
  deletedBy: string | null;

  @ApiProperty({
    example: BooleanTypes.Y,
    description: '사용여부',
    required: true,
    enum: BooleanTypes,
  })
  useYn: BooleanTypes;

  @ApiProperty({
    example: '비고',
    description: '비고',
    required: false,
  })
  remark: string | null;
}
