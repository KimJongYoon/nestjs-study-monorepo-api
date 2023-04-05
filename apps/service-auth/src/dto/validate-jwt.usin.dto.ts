import { ApiProperty } from '@nestjs/swagger';

export class ValidateJwtUsinDto {
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;
}
