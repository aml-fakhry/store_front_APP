import supertest from 'supertest';

import { app } from '../app';
import { userDataAccess } from '../data/user/data/user.data';
import { Database } from './../server/server';
import { userDTO } from './../data/user/model/user.dto';
import { DataResult } from '../shared';

const user = {
  username: 'aml fakhri_test',
  firstname: 'aml',
  lastname: 'fakhri',
  email: 'aml_fakhri_test@gmail.com',
  password: '223344',
  country: 'egypt',
  phone: '021345457',
} as userDTO;

let createUser: DataResult<userDTO>;

beforeAll(async () => {
  createUser = await userDataAccess.create(user);
  user.id = createUser.data.id;
  user.password = createUser.data.password;
});

afterAll(async () => {
  await Database.query(`DELETE FROM public.users WHERE id = $1;`, [createUser.data.id]);
});

describe('User Model', () => {
  it('should have a create method', async () => {
    expect(userDataAccess.create).toBeDefined();
  });

  it('should have a findById method', async () => {
    expect(userDataAccess.findById).toBeDefined();
  });

  it('should have a findByCredentials method', async () => {
    expect(userDataAccess.findByCredentials).toBeDefined();
  });

  it('should have a createAccessToken method', async () => {
    expect(userDataAccess.createAccessToken).toBeDefined();
  });

  it('should have a findAccessTokenById method', async () => {
    expect(userDataAccess.findAccessTokenById).toBeDefined();
  });

  it('findById method should return a specific user', async () => {
    const userResult = (await userDataAccess.findById(createUser.data.id ?? 0)).data;
    expect(userResult).toEqual(user);
  });

  // it('show method should return the correct book', async () => {
  //   const result = await store.show("1");
  //   expect(result).toEqual({
  //     id: "1",
  //     title: 'Bridge to Terabithia',
  //     total_pages: 250,
  //     author: 'Katherine Paterson',
  //     type: 'Childrens'
  //   });
  // });

  // it('delete method should remove the book', async () => {
  //   store.delete("1");
  //   const result = await store.index()

  //   expect(result).toEqual([]);
  // });
});

describe('test user model process', () => {
  it('create (signup) method.', async () => {
    expect(createUser.data).toEqual(user);
  });

  it('findByCredentials (login) method should Finds the user with the given `username` and `password`', async () => {
    const result = (await userDataAccess.findByCredentials(user.username, '223344')).data;
    expect(result).toEqual(user);
  });
});

/**
 * integration test.
 */
const request = supertest(app);
describe('Test user endpoint API', () => {
  it('Pass when response status equal 200 when get user', async () => {
    const response = await request
      .get(`/api/user/${user.id}`)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 200 when login', async () => {
    const response = await request
      .post('/api/user/login')
      .send({
        username: user.username,
        password: '223344',
      })
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2MTIzZjc2LTZkMjMtNGZiMy1iNzc3LWE1M2JkMjRlNzk5MyIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNjY4OTkwLCJleHAiOjE2NTMyNjA5OTB9.gtXBpvgcxqVOlWCati4jQCOSF54RcaptEaavnTGIU8I'
      );
    expect(response.status).toBe(200);
  });

  it('Pass when response status equal 401 when login and not authorized', async () => {
    const response = await request.get('/api/user/0');
    expect(response.status).toBe(401);
  });
});
