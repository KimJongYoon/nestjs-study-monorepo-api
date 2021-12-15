import configuration from './config/env.configuration';
import * as bcrypt from 'bcryptjs';

export class HasherHelper {
  static async hash(key: string): Promise<string> {
    const salt = configuration().secret_salt;
    return await bcrypt.hash(key, salt);
  }

  static async generateSalt(): Promise<string> {
    bcrypt.randomBytes(64).toString('hex');
    return await bcrypt.genSalt();
  }

  static async generateRandomToken(): Promise<string> {
    return await bcrypt.genSaltSync(10);
  }
}
