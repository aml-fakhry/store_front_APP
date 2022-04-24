import { QueryResult } from 'pg';

import { orderDataAccess } from '../data';
import { Database } from './../server/server';

describe('Order Model', () => {
  it('should have a create order method', async () => {
    expect(orderDataAccess.create).toBeDefined();
  });

  it('should have a find order By Id method', async () => {
    expect(orderDataAccess.findById).toBeDefined();
  });

  it('should have a getAllOrders method', async () => {
    expect(orderDataAccess.getAllOrders).toBeDefined();
  });

  it('should have a getOrdersByUserId method', async () => {
    expect(orderDataAccess.getOrdersByUserId).toBeDefined();
  });

  it('should have a getCompletedOrderByUserId method', async () => {
    expect(orderDataAccess.getCompletedOrderByUserId).toBeDefined();
  });

  it('findById method should return a specific order', async () => {
    spyOn(Database, 'query').and.returnValue(
      Promise.resolve({
        rows: [
          {
            id: 2,
            quantity: 3,
            status: 'true',
            product_id: '1',
            user_id: '1',
          },
        ],
      } as QueryResult)
    );
    const userResult = (await orderDataAccess.findById(1)).data;
    expect(userResult as unknown).toEqual({
      id: 2,
      quantity: 3,
      status: 'true',
      product_id: '1',
      user_id: '1',
    });
  });

  it('getOrdersByUserId method to get all orders by specific user id.`', async () => {
    spyOn(Database, 'query').and.returnValue(
      Promise.resolve({
        rows: [
          {
            id: 2,
            quantity: 3,
            status: 'true',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 4,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 5,
            quantity: 3,
            status: 'complete',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 6,
            quantity: 3,
            status: 'activ',
            product_id: '2',
            user_id: '1',
          },
          {
            id: 7,
            quantity: 3,
            status: 'activ',
            product_id: '2',
            user_id: '1',
          },
          {
            id: 8,
            quantity: 3,
            status: 'activ',
            product_id: '2',
            user_id: '1',
          },
          {
            id: 9,
            quantity: 3,
            status: 'activ',
            product_id: '2',
            user_id: '1',
          },
          {
            id: 10,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 11,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 12,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 13,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 14,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 15,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 16,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 17,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 18,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 19,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 20,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
          {
            id: 22,
            quantity: 3,
            status: 'active',
            product_id: '5',
            user_id: '1',
          },
          {
            id: 21,
            quantity: 3,
            status: 'active',
            product_id: '1',
            user_id: '1',
          },
        ],
      } as QueryResult)
    );
    const result = (await orderDataAccess.getOrdersByUserId(1)).data;
    expect(result).toEqual([
      {
        id: 2,
        quantity: 3,
        status: 'true',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 4,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 5,
        quantity: 3,
        status: 'complete',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 6,
        quantity: 3,
        status: 'activ',
        product_id: '2',
        user_id: '1',
      },
      {
        id: 7,
        quantity: 3,
        status: 'activ',
        product_id: '2',
        user_id: '1',
      },
      {
        id: 8,
        quantity: 3,
        status: 'activ',
        product_id: '2',
        user_id: '1',
      },
      {
        id: 9,
        quantity: 3,
        status: 'activ',
        product_id: '2',
        user_id: '1',
      },
      {
        id: 10,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 11,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 12,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 13,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 14,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 15,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 16,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 17,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 18,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 19,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 20,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
      {
        id: 22,
        quantity: 3,
        status: 'active',
        product_id: '5',
        user_id: '1',
      },
      {
        id: 21,
        quantity: 3,
        status: 'active',
        product_id: '1',
        user_id: '1',
      },
    ]);
  });
});

it('getCompletedOrderByUserId method to get completed orders.', async () => {
  spyOn(Database, 'query').and.returnValue(
    Promise.resolve({
      rows: [
        {
          id: 5,
          quantity: 3,
          status: 'complete',
          product_id: '1',
          user_id: '1',
        },
      ],
    } as QueryResult)
  );
  const result = (await orderDataAccess.getCompletedOrderByUserId(1)).data;
  expect(result).toEqual([
    {
      id: 5,
      quantity: 3,
      status: 'complete',
      product_id: '1',
      user_id: '1',
    },
  ]);
});

it('getAllOrders method to get all orders.', async () => {
  spyOn(Database, 'query').and.returnValue(
    Promise.resolve({
      rows: [
        {
          id: 2,
          quantity: 3,
          status: 'true',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 4,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 5,
          quantity: 3,
          status: 'complete',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 6,
          quantity: 3,
          status: 'activ',
          product_id: '2',
          user_id: '1',
        },
        {
          id: 7,
          quantity: 3,
          status: 'activ',
          product_id: '2',
          user_id: '1',
        },
        {
          id: 8,
          quantity: 3,
          status: 'activ',
          product_id: '2',
          user_id: '1',
        },
        {
          id: 9,
          quantity: 3,
          status: 'activ',
          product_id: '2',
          user_id: '1',
        },
        {
          id: 10,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 11,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 12,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 13,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 14,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 15,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 16,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 17,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 18,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 19,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 20,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
        {
          id: 22,
          quantity: 3,
          status: 'active',
          product_id: '5',
          user_id: '1',
        },
        {
          id: 21,
          quantity: 3,
          status: 'active',
          product_id: '1',
          user_id: '1',
        },
      ],
    } as QueryResult)
  );
  const result = (await orderDataAccess.getAllOrders()).data;
  expect(result).toEqual([
    {
      id: 2,
      quantity: 3,
      status: 'true',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 4,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 5,
      quantity: 3,
      status: 'complete',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 6,
      quantity: 3,
      status: 'activ',
      product_id: '2',
      user_id: '1',
    },
    {
      id: 7,
      quantity: 3,
      status: 'activ',
      product_id: '2',
      user_id: '1',
    },
    {
      id: 8,
      quantity: 3,
      status: 'activ',
      product_id: '2',
      user_id: '1',
    },
    {
      id: 9,
      quantity: 3,
      status: 'activ',
      product_id: '2',
      user_id: '1',
    },
    {
      id: 10,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 11,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 12,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 13,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 14,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 15,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 16,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 17,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 18,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 19,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 20,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
    {
      id: 22,
      quantity: 3,
      status: 'active',
      product_id: '5',
      user_id: '1',
    },
    {
      id: 21,
      quantity: 3,
      status: 'active',
      product_id: '1',
      user_id: '1',
    },
  ]);
});
