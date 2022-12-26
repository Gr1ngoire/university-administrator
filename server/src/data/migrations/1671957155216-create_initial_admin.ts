import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import type { UserSignUpRequestDto } from 'src/common/types/types';
import { Grants } from 'src/common/enums/enums';

const PASSWORD_SALT_ROUNDS = 5;
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_GRANT: Grants = Grants.ADMIN;

const initialAdminData: UserSignUpRequestDto = {
  name: 'admin',
  surname: 'admin',
  secondName: 'admin',
  phone: '+380678453465',
  email: ADMIN_EMAIL,
  password: '!Test1234',
};

const { name, surname, secondName, phone, email, password } = initialAdminData;

export class createInitialAdmin1671957155216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

    queryRunner.query(
      `INSERT INTO users (name, surname, second_name, phone, email, password) VALUES ('${name}', '${surname}', '${secondName}', '${phone}', '${email}', '${hashedPassword}')`,
    );
    queryRunner.query(
      `INSERT INTO grants (user_id, "grant", granter_id) VALUES ((SELECT id FROM users WHERE email = '${email}'), '${ADMIN_GRANT}', null)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM grants WHERE user_id = (SELECT id FROM users WHERE email = '${ADMIN_EMAIL}')`,
    );
    queryRunner.query(`DELETE FROM users WHERE email = '${ADMIN_EMAIL}'`);
  }
}
