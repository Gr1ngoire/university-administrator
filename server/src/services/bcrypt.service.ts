import { Injectable } from 'src/common/decorators/decorators';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  comparePasswords(
    passwordToCheck: string,
    sourcePassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordToCheck, sourcePassword);
  }

  hashPassword(toHash: string, salt: number): Promise<string> {
    return bcrypt.hash(toHash, salt);
  }
}
