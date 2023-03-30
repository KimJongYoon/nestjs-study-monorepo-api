import * as bcrypt from 'bcrypt';
export class BcryptHelper {
  /**
   * 비밀번호 해쉬
   * @param password
   * @returns
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * 비밀번호 비교
   * @param password
   * @param hash
   * @returns
   */
  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
