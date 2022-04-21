import { DataResult } from './../../shared/model/data-result.model';
import { Database } from './../../server/server';
import { userDTO } from './user.dto';
import { Hash } from '../../shared/utils/hash.util';
import { AppError, AppErrorCode } from '../../shared';
import { accessTokenDTO } from './access-token.dto';
/**
 * the user data-access service it includes all functionalities such create, search, delete and update.
 */
export class userDataAccess {
  /**
   * Create a new user based on provided data model.
   */
  static async create(data: userDTO): Promise<DataResult<userDTO>> {
    const result: DataResult<userDTO> = {} as DataResult<userDTO>;

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
      const user = (
        await Database.query(
          `INSERT INTO users(
         username, email, password, country, phone)
        VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
          [data.username, data.email, hashedPassword, data.country, data.phone]
        )
      ).rows[0];

      result.data = (await this.findById(user.id)).data;
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
  static async findById(userId: number): Promise<DataResult<userDTO>> {
    const result: DataResult<userDTO> = {} as DataResult<userDTO>;
    try {
      result.data = (await Database.query(`SELECT * FROM users where id = $1 ;`, [userId])).rows[0];
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the user with the given `username` and `password`.
   * @param username The username of the user.
   * @param password The password of the user.
   */
  static async findByCredentials(username: string, password: string): Promise<DataResult<userDTO>> {
    const result: DataResult<userDTO> = {} as DataResult<userDTO>;

    try {
      const user = await (await Database.query(`SELECT * FROM users where username = $1;`, [username])).rows[0];

      /**
       * Check user existence, password validity & allowance to log in the system.
       */
      if (!user || !(await Hash.compare(password, user.password))) {
        result.isNotFound = true;
        return result;
      }

      result.data = (await this.findById(user.id)).data;

      result.isNotFound = !user;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Create a new access-token based on provided data model.
   */
  static async createAccessToken(data: accessTokenDTO) {
    const result: DataResult<accessTokenDTO> = {} as DataResult<accessTokenDTO>;

    try {
      const user = (await Database.query(`SELECT * FROM users where id = $1;`, [data.userId])).rows[0];

      if (!user) {
        result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'userId',
            title: AppError.RelatedEntityNotFound,
            detail: `USER_IS_NOT_EXIST`,
          },
        ];
        return result;
      }

      /* Create a new user. */
      const accessToken = (
        await Database.query(
          `INSERT INTO "accessTokens"
          ("issuedAt", "expiresAt", "userId")
          VALUES ($1, $2, $3) RETURNING id;`,
          [data.issuedAt, data.expiresAt, data.userId]
        )
      ).rows[0];

      result.data = (await this.findAccessTokenById(accessToken.id)).data;
      result.isNotFound = !user;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the access-token with the given id.
   * @param accessTokenId the id of access-token.
   * @returns
   */
  static async findAccessTokenById(accessTokenId: number): Promise<DataResult<accessTokenDTO>> {
    const result: DataResult<accessTokenDTO> = {} as DataResult<accessTokenDTO>;

    try {
      result.data = (await Database.query(`SELECT * FROM accessTokens where id = $1;`, [accessTokenId])).rows[0];

      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
