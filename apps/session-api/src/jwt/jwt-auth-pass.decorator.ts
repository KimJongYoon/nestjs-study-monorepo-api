import { SetMetadata } from '@nestjs/common';

export const JwtAuthPassKey = 'isJwtAuthPass';
export const JwtAuthPass = () => SetMetadata(JwtAuthPassKey, true);
