import { DataResult } from '../../../shared/model/data-result.model';
import { Database } from '../../../server/server';
import { productDTO } from './../model/product.dto';
import { AppError, AppErrorCode } from '../../../shared';
import { categoryDTO } from './../model/category.dto';

/**
 * the product data-access service it includes all functionalities such create, search, delete and update.
 */
export class productDataAccess {
  /**
   * Create a new product based on provided data model.
   */
  static async create(data: productDTO): Promise<DataResult<productDTO>> {
    const result: DataResult<productDTO> = {} as DataResult<productDTO>;

    try {
      /**
       * Fetch data to be validate.
       */
      const nameExistence = await Database.query(`SELECT name FROM products where name = $1;`, [data.name]);

      //#region validate

      if (nameExistence.rowCount >= 1) {
        /** Check if username is already exists in database. */
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: AppError.ValueExists,
            detail: `Product name already exists`,
          },
        ];
        return result;
      }
      //#endregion

      /* Create a new product. */
      const product = (
        await Database.query(
          `INSERT INTO products (name, price, categoryId)
           VALUES ($1, $2, $3) RETURNING id;`,
          [data.name, data.price, data.categoryId]
        )
      ).rows[0];

      result.data = (await this.findById(product.id)).data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the product with the given id.
   * @param productId the id of product.
   * @returns
   */
  static async findById(productId: number): Promise<DataResult<productDTO>> {
    const result: DataResult<productDTO> = {} as DataResult<productDTO>;
    try {
      result.data = (await Database.query(`SELECT * FROM products where id = $1 ;`, [productId])).rows[0];
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Gets all the products.
   * @returns
   */
  static async getAllProducts(): Promise<DataResult<productDTO[]>> {
    const result: DataResult<productDTO[]> = {} as DataResult<productDTO[]>;
    try {
      result.data = (await Database.query(`SELECT * FROM products;`)).rows;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /* ---------------------Category-------------------- */

  /**
   * Create a new category based on provided data model.
   */
  static async createCategory(data: categoryDTO): Promise<DataResult<categoryDTO>> {
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

      result.data = (await this.findCategoryById(category.id)).data;
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
  static async findCategoryById(categoryId: number): Promise<DataResult<categoryDTO>> {
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
