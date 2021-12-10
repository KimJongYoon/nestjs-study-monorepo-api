import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../../common/src/base.dto';

export class CreateTestDto extends BaseDto {
  @ApiProperty({ example: '이름', description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ example: '29', description: '나이' })
  @IsNumber()
  age: number;

}
