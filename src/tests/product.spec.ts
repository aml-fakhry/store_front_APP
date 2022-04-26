import { Database } from './../server/server';
import { productDataAccess } from './../data/product/data/product.data';
import supertest from 'supertest';
import { app } from '../app';
import { productDTO } from './../data/product/model/product.dto';
import { DataResult } from '../shared';

const products = [
  {
    name: 'product 8',
    price: 30,
    category_id: 2,
  },
  {
    name: 'product 9',
    price: 30,
    category_id: 2,
  },
  {
    name: 'product 10',
    price: 30,
    category_id: 3,
  },
] as productDTO[];

let createProducts: DataResult<productDTO>[];

beforeAll(async () => {
  createProducts = await Promise.all(products.map(productDataAccess.create.bind(productDataAccess)));

  createProducts.forEach((createdProduct, idx) => {
    products[idx].id = createdProduct.data.id;
  });
});

afterAll(async () => {
  const ids = products.map((p) => p.id);

  await Database.query(`DELETE FROM public.products WHERE id IN ($1, $2, $3);`, [...ids]);
});

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
    const result = (await productDataAccess.findById(createProducts[0].data.id ?? 0)).data;
    expect(result).toEqual(createProducts[0].data);
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
      .get(`/api/product/${products[0].id}`)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get products by their categories.', async () => {
    const response = await request
      .get(`/api/product/category/${products[0].id}`)
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
