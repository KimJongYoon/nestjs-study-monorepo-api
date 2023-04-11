import { SetMetadata } from '@nestjs/common';

export const IS_PASS_JWT_KEY = 'isPassJwt';
export const PassJwtGuard = () => SetMetadata(IS_PASS_JWT_KEY, true);
