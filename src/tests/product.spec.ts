import { QueryResult } from 'pg';

import { Database } from './../server/server';
import { productDataAccess } from './../data/product/data/product.data';
import supertest from 'supertest';
import { app } from '../app';

describe('Order Model', () => {
  it('should have a create order method', async () => {
    expect(productDataAccess.create).toBeDefined();
  });

  it('should have a find order By Id method', async () => {
    expect(productDataAccess.findById).toBeDefined();
  });

  it('should have a getAllProducts method', async () => {
    expect(productDataAccess.getAllProducts).toBeDefined();
  });

  it('should have a getProductsByCategoryId method', async () => {
    expect(productDataAccess.getProductsByCategoryId).toBeDefined();
  });

  it('should have a getTopProducts method', async () => {
    expect(productDataAccess.getTopProducts).toBeDefined();
  });

  it('findById method should return a specific product', async () => {
    spyOn(Database, 'query').and.returnValue(
      Promise.resolve({
        rows: [
          {
            id: 1,
            name: '',
            price: 10,
            category_id: '1',
          },
        ],
      } as QueryResult)
    );
    const userResult = (await productDataAccess.findById(1)).data;
    expect(userResult as unknown).toEqual({
      id: 1,
      name: '',
      price: 10,
      category_id: '1',
    });
  });

  it('getProductsByCategoryId method to get product by category id.', async () => {
    const result = (await productDataAccess.getProductsByCategoryId(1)).data;
    expect(result).toEqual([
      {
        id: 1,
        name: '',
        price: 10,
        category_id: '1',
      },
      {
        id: 2,
        name: 'product 1',
        price: 10,
        category_id: '1',
      },
    ]);
  });

  it('getTopProducts method to get trend product.', async () => {
    spyOn(Database, 'query').and.returnValue(
      Promise.resolve({
        rows: [
          {
            product_id: '1',
            freq: '15',
          },
          {
            product_id: '2',
            freq: '4',
          },
          {
            product_id: '5',
            freq: '1',
          },
        ],
      } as QueryResult)
    );
    const result = (await productDataAccess.getTopProducts()).data;
    expect(result).toEqual([
      {
        product_id: '1',
        freq: '15',
      },
      {
        product_id: '2',
        freq: '4',
      },
      {
        product_id: '5',
        freq: '1',
      },
    ]);
  });

  it('getAllProducts method to get all products.', async () => {
    const result = (await productDataAccess.getAllProducts()).data;
    expect(result).toEqual([
      {
        id: 1,
        name: '',
        price: 10,
        category_id: '1',
      },
      {
        id: 2,
        name: 'product 1',
        price: 10,
        category_id: '1',
      },
      {
        id: 3,
        name: 'product 2',
        price: 20,
        category_id: '2',
      },
      {
        id: 4,
        name: 'product 3',
        price: 30,
        category_id: '3',
      },
      {
        id: 5,
        name: 'product 4',
        price: 30,
        category_id: '3',
      },
      {
        id: 6,
        name: 'product 5',
        price: 30,
        category_id: '3',
      },
      {
        id: 7,
        name: 'product 6',
        price: 30,
        category_id: '2',
      },
    ]);
  });
});

/**
 * integration test.
 */
const request = supertest(app);
describe('Test product endpoint API', () => {
  it('Pass when response status equal 200 when get all product', async () => {
    const response = await request
      .get('/api/product')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get specific product', async () => {
    const response = await request
      .get('/api/product/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get products by their categories.', async () => {
    const response = await request
      .get('/api/product/category/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get trend/top products', async () => {
    const response = await request
      .get('/api/product/top-products')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 401 when login and not authorized', async () => {
    const response = await request.get('/api/product/top-products');
    expect(response.status).toBe(401);
  });
});
