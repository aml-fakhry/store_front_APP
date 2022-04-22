import { DataResult } from '../../../shared/model/data-result.model';
import { Database } from '../../../server/server';
import { productDTO } from './../model/product.dto';
import { AppError, AppErrorCode } from '../../../shared';
import { categoryDTO } from '../../category/model/category.dto';

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

  /**
   * Gets the products by category id.
   * @returns
   */
  static async getProductsByCategoryId(categoryId: number): Promise<DataResult<productDTO[]>> {
    const result: DataResult<productDTO[]> = {} as DataResult<productDTO[]>;
    try {
      result.data = (await Database.query(`SELECT * FROM products Where categoryId = $1 ;`, [categoryId])).rows;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Gets top products.
   * @returns
   */
  static async getTopProducts(): Promise<DataResult<unknown[]>> {
    const result: DataResult<unknown[]> = {} as DataResult<unknown[]>;
    try {
      result.data = (
        await Database.query(
          `SELECT
            productId, count(productId) AS freq
            FROM public."orders"
            GROUP BY productId
            ORDER BY freq DESC LIMIT 5;`
        )
      ).rows;
      console.log(result.data);

      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
