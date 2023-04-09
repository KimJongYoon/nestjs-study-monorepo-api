import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateJwtUsinDto {
  @ApiProperty({
    description: 'Access token',
  })
  @IsString()
  accessToken: string;
}
