import { DataResult } from '../../../shared/model/data-result.model';
import { Database } from '../../../server/server';

import { AppError, AppErrorCode } from '../../../shared';
import { categoryDTO } from '../model/category.dto';

/**
 * the category data-access service it includes all functionalities such create, search, delete and update.
 */
export class categoryDataAccess {
  /**
   * Create a new category based on provided data model.
   */
  static async create(data: categoryDTO): Promise<DataResult<categoryDTO>> {
    const result: DataResult<categoryDTO> = {} as DataResult<categoryDTO>;

    try {
      /**
       * Fetch data to be validate.
       */
      const nameExistence = await Database.query(`SELECT name FROM categories where name = $1;`, [data.name]);

      //#region validate

      if (nameExistence.rowCount >= 1) {
        /** Check if username is already exists in database. */
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: AppError.ValueExists,
            detail: `Category name already exists`,
          },
        ];
        return result;
      }
      //#endregion

      /* Create a new category. */
      const category = (await Database.query(`INSERT INTO categories(name) VALUES ($1) RETURNING id;`, [data.name]))
        .rows[0];

      result.data = (await this.findById(category.id)).data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the category with the given id.
   * @param categoryId the id of category.
   * @returns
   */
  static async findById(categoryId: number): Promise<DataResult<categoryDTO>> {
    const result: DataResult<categoryDTO> = {} as DataResult<categoryDTO>;
    try {
      result.data = (await Database.query(`SELECT * FROM categories where id = $1 ;`, [categoryId])).rows[0];
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Gets all the categories.
   * @returns
   */
  static async getAllCategories(): Promise<DataResult<categoryDTO[]>> {
    const result: DataResult<categoryDTO[]> = {} as DataResult<categoryDTO[]>;
    try {
      result.data = (await Database.query(`SELECT * FROM categories;`)).rows;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
