import { DataResult } from '../../../shared/model/data-result.model';
import { Database } from '../../../server/server';
import { orderDTO } from './../model/order.model';
import { AppError, AppErrorCode } from '../../../shared';

/**
 * the order data-access service it includes all functionalities such create, search, delete and update.
 */
export class orderDataAccess {
  /**
   * Create a new product based on provided data model.
   */
  static async create(data: orderDTO): Promise<DataResult<orderDTO>> {
    const result: DataResult<orderDTO> = {} as DataResult<orderDTO>;

    try {
      /**
       * Fetch data to be validate.
       */
      const [dbProduct, dbUser] = await Promise.all([
        Database.query(`SELECT * FROM products where id = $1;`, [data.product_id]),
        Database.query(`SELECT * FROM users where id = $1;`, [data.user_id]),
      ]);

      if (dbProduct.rowCount == 0) {
        /** Check if product_id is already exists in database. */
        result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'product_id',
            title: AppError.RelatedEntityNotFound,
            detail: `Product not exists in db.`,
          },
        ];
        return result;
      } else if (dbUser.rowCount == 0) {
        /** Check if user_id is already exists in database. */
        result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'user_id',
            title: AppError.RelatedEntityNotFound,
            detail: `User not exists in db.`,
          },
        ];
        return result;
      }

      /* Create a new order. */
      const order = (
        await Database.query(
          `INSERT INTO orders (status, quantity, product_id, user_id )
           VALUES ($1, $2, $3, $4) RETURNING *;`,
          [data.status, data.quantity, data.product_id, data.user_id]
        )
      ).rows[0];

      await Database.query(
        `INSERT INTO order_products (quantity, order_id, product_id )
         VALUES ($1, $2, $3 ) RETURNING id;`,
        [order.quantity, order.id, data.product_id]
      );

      result.data = (await this.findById(order.id)).data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the order with the given id.
   * @param orderId the id of order.
   * @returns
   */
  static async findById(orderId: number): Promise<DataResult<orderDTO>> {
    const result: DataResult<orderDTO> = {} as DataResult<orderDTO>;
    try {
      result.data = (await Database.query(`SELECT * FROM orders where id = $1 ;`, [orderId])).rows[0];
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Gets all the orders.
   * @returns
   */
  static async getAllOrders(): Promise<DataResult<orderDTO[]>> {
    const result: DataResult<orderDTO[]> = {} as DataResult<orderDTO[]>;
    try {
      result.data = (await Database.query(`SELECT * FROM orders;`)).rows;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Gets the orders by user id.
   * @param userId the id of user.
   * @returns
   */
  static async getOrdersByUserId(userId: number): Promise<DataResult<orderDTO[]>> {
    const result: DataResult<orderDTO[]> = {} as DataResult<orderDTO[]>;
    try {
      result.data = (await Database.query(`SELECT * FROM orders Where user_id = $1 ;`, [userId])).rows;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Gets the completed orders by user id.
   * @param userId the id of user.
   * @returns
   */
  static async getCompletedOrderByUserId(userId: number): Promise<DataResult<orderDTO[]>> {
    const result: DataResult<orderDTO[]> = {} as DataResult<orderDTO[]>;
    try {
      result.data = (
        await Database.query(`SELECT * FROM orders Where user_id = $1 And status = $2 ;`, [userId, 'complete'])
      ).rows;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
