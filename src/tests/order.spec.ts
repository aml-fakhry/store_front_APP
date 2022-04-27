import { orderDataAccess } from '../data';
import { Database } from './../server/server';
import { orderDTO } from './../data/order/model/order.model';
import { DataResult } from '../shared';
import supertest from 'supertest';
import { app } from '../app';

const orders = [
  {
    status: 'active',
    quantity: 3,
    product_id: 6,
    user_id: 41,
  },
  {
    status: 'active',
    quantity: 3,
    product_id: 2,
    user_id: 41,
  },
  {
    status: 'complete',
    quantity: 4,
    product_id: 6,
    user_id: 42,
  },
  {
    status: 'complete',
    quantity: 3,
    product_id: 6,
    user_id: 42,
  },
] as orderDTO[];

let createOrders: DataResult<orderDTO>[];

beforeAll(async () => {
  createOrders = await Promise.all(orders.map(orderDataAccess.create.bind(orderDataAccess)));

  createOrders.forEach((createdOrder, idx) => {
    orders[idx].id = createdOrder.data.id;
  });
});

afterAll(async () => {
  const ids = orders.map((p) => p.id);

  await Database.query(`DELETE FROM public.orders WHERE id IN ($1, $2, $3, $4);`, [...ids]);
});

describe('Order Model', () => {
  it('should have a create order method.', async () => {
    expect(orderDataAccess.create).toBeDefined();
  });

  it('should have a find order By Id method.', async () => {
    expect(orderDataAccess.findById).toBeDefined();
  });

  it('should have a getAllOrders method.', async () => {
    expect(orderDataAccess.getAllOrders).toBeDefined();
  });

  it('should have a getOrdersByUserId method.', async () => {
    expect(orderDataAccess.getOrdersByUserId).toBeDefined();
  });

  it('should have a getCompletedOrderByUserId method.', async () => {
    expect(orderDataAccess.getCompletedOrderByUserId).toBeDefined();
  });

  it('findById method should return a specific order.', async () => {
    const userResult = (await orderDataAccess.findById(createOrders[0].data.id ?? 0)).data;
    expect(userResult).toEqual(createOrders[0].data);
  });

  it('getOrdersByUserId method to get all orders by specific user id.`', async () => {
    const result = (await orderDataAccess.getOrdersByUserId(createOrders[0].data.user_id)).data;
    const res1 = result.some((order) => order.id === orders[0].id);
    const res2 = result.some((order) => order.id === orders[1].id);
    expect(res1 && res2).toBeTrue();
  });

  it('getCompletedOrderByUserId method to get completed orders.', async () => {
    const result = (await orderDataAccess.getCompletedOrderByUserId(createOrders[0].data.user_id)).data;
    const data = result.filter((order) => order.user_id === orders[0].user_id);
    expect(result).toEqual(data);
  });

  it('getAllOrders method to get all orders.', async () => {
    const result = (await orderDataAccess.getAllOrders()).data;

    const res1 = result.some((dbOrder) => orders.map((order) => dbOrder.id === order.id));
    expect(res1).toBeTrue();
  });
});

//#region integrations test.
/**
 * integration test.
 */
const request = supertest(app);
describe('Test order endpoint API', () => {
  it('Pass when response status equal 200 when get all orders.', async () => {
    const response = await request
      .get('/api/order')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get specific order.', async () => {
    const response = await request
      .get(`/api/order/${orders[0].id}`)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get completed orders.', async () => {
    const response = await request
      .get(`/api/order/complete-product/${orders[0].id}`)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get orders by product id.', async () => {
    const response = await request
      .get(`/api/order/product/${orders[0].product_id}`)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 401 when login and not authorized.', async () => {
    const response = await request.get(`/api/order/product/${orders[0].id}`);
    expect(response.status).toBe(401);
  });
});
//#endregion
