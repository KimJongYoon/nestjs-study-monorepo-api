import { registerAs } from '@nestjs/config';

export default registerAs('partners-database', () => ({
  partnersDatabaseUrl: process.env.PARTNERS_DATABASE_URL,
}));
