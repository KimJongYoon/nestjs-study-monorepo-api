import { registerAs } from '@nestjs/config';

export default registerAs('usin-database', () => ({
  usinDatabaseUrl: process.env.USIN_DATABASE_URL,
}));
