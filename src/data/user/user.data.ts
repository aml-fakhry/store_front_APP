import { DataResult } from './../../shared/model/data-result.model';
import { Database } from './../../server/server';
import { userDto } from './user.dto';
import { Hash } from '../../shared/utils/hash.util';
import { AppError, AppErrorCode } from '../../shared';
/**
 * the user data-access service it includes all functionalities such create, search, delete and update.
 */
export class userDataAccess {
  /**
   * Create a new user based on provided data model.
   */
  static async create(data: userDto): Promise<DataResult<userDto>> {
    const result: DataResult<userDto> = {} as DataResult<userDto>;

    try {
      /**
       * Fetch data to be validate.
       */
      const [usernameExistence, emailExistence] = await Promise.all([
        Database.query(`SELECT username FROM users where username = $1;`, [data.username]),
        Database.query(`SELECT email FROM users where email = $1;`, [data.email]),
      ]);

      //#region validate

      if (usernameExistence.rowCount >= 1) {
        /** Check if username is already exists in database. */
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'username',
            title: AppError.ValueExists,
            detail: `User name already exists`,
          },
        ];
        return result;
      } else if (emailExistence.rowCount >= 1) {
        /** Check if email is already exists in database. */
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'email',
            title: AppError.ValueExists,
            detail: `Email is already exists`,
          },
        ];
        return result;
      }
      //#endregion

      /* Hashed the password. */
      const hashedPassword = await Hash.hash(data.password);

      /* Create a new user. */
      const user = await Database.query(
        `INSERT INTO users(
         username, email, password, country, phone)
        VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
        [data.username, data.email, hashedPassword, data.country, data.phone]
      );

      result.data = (await this.findById(user.rows[0].id)).data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the user with the given id.
   * @param userId the id of user.
   * @returns
   */
  static async findById(userId: number): Promise<DataResult<userDto>> {
    const result: DataResult<userDto> = {} as DataResult<userDto>;
    try {
      result.data = (await Database.query(`SELECT * FROM users where id = $1 ;`, [userId])).rows[0];
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
