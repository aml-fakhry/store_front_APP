import supertest from 'supertest';

import { app } from '../app';
import { productDTO } from '../data/product/model/product.dto';
import { DataResult } from '../shared';
import { categoryDataAccess } from './../data/category/data/category.data';
import { Database } from '../server/server';
import { productDataAccess } from '../data/product/data/product.data';
import { token } from './2_user.spec';

const products = [
  {
    name: 'product 8',
    price: 30,
    category_id: 1,
  },
  {
    name: 'product 9',
    price: 30,
    category_id: 1,
  },
  {
    name: 'product 10',
    price: 30,
    category_id: 1,
  },
] as productDTO[];

let createProducts: DataResult<productDTO>[];

beforeAll(async () => {
  try {
    const x = await categoryDataAccess.create({
      name: 'category 1',
    });

    createProducts = await Promise.all(products.map(productDataAccess.create.bind(productDataAccess)));

    createProducts.forEach((createdProduct, idx) => {
      products[idx].id = createdProduct.data.id;
      products[idx].category_id = createdProduct.data.category_id;
    });
  } catch (e) {
    console.log(e);
  }
});

// afterAll(async () => {
//   const ids = products.map((p) => p.id);

//   await Database.query(`DELETE FROM public.products WHERE id IN ($1, $2, $3);`, [...ids]);
// });

describe('Product Model', () => {
  it('should have a create order method.', async () => {
    expect(productDataAccess.create).toBeDefined();
  });

  it('should have a find order By Id method.', async () => {
    expect(productDataAccess.findById).toBeDefined();
  });

  it('should have a getAllProducts method.', async () => {
    expect(productDataAccess.getAllProducts).toBeDefined();
  });

  it('should have a getProductsByCategoryId method.', async () => {
    expect(productDataAccess.getProductsByCategoryId).toBeDefined();
  });

  it('should have a getTopProducts method.', async () => {
    expect(productDataAccess.getTopProducts).toBeDefined();
  });

  it('findById method should return a specific product.', async () => {
    const result = (await productDataAccess.findById(createProducts[0].data.id ?? 0)).data;
    expect(result).toEqual(createProducts[0].data);
  });

  it('getAllProducts method to get all products.', async () => {
    const result = (await productDataAccess.getAllProducts()).data;

    const res1 = result.some((dbProduct) => products.map((product) => dbProduct.id === product.id));

    expect(res1).toBeTrue();
  });
});

//#region integrations test.
/**
 * integration test.
 */
const request = supertest(app);
describe('Test product endpoint API', () => {
  it('Pass when response status equal 200 when get all products.', async () => {
    const response = await request.get('/api/product').set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get specific product.', async () => {
    const response = await request.get(`/api/product/${products[0].id}`).set('Authorization', token);
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get products by their categories.', async () => {
    const response = await request.get(`/api/product/category/${products[0].id}`).set('Authorization', token);
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when get trend/top products.', async () => {
    const response = await request.get('/api/product/top-products').set('Authorization', token);
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 401 when login and not authorized.', async () => {
    const response = await request.get('/api/product/top-products');
    expect(response.status).toBe(401);
  });
});
//#endregion
