import { DataResult } from '../../../shared/model/data-result.model';
import { Database } from '../../../server/server';
import { orderDTO } from './../model/order.model';

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
      /* Create a new order. */
      const order = (
        await Database.query(
          `INSERT INTO orders (quantity, productId,userId )
           VALUES ($1, $2, $3) RETURNING id;`,
          [data.quantity, data.productId, data.userId]
        )
      ).rows[0];

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
   * Gets the orders by product id.
   * @param productId the id of product.
   * @returns
   */
  static async getOrdersByProductId(productId: number): Promise<DataResult<orderDTO[]>> {
    const result: DataResult<orderDTO[]> = {} as DataResult<orderDTO[]>;
    try {
      result.data = (await Database.query(`SELECT * FROM orders Where productId = $1 ;`, [productId])).rows;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
