import { userDataAccess } from '../data/user/data/user.data';
import { Hash } from './../shared/utils/hash.util';
import { Database } from './../server/server';
import { QueryResult } from 'pg';

const user = {
  username: 'aml fakhri 5' /* should username change this after every test. */,
  firstname: 'aml',
  lastname: 'fakhri',
  email: 'aml_fakhri5@gmail.com' /* should email change this after every test. */,
  password: '223344',
  country: 'egypt',
  phone: '021345457',
};

const createResult = {
  data: {
    id: 5,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: /* await Hash.hash(user.password) */ '33333',
    country: user.country,
    phone: user.phone,
  },
};

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
    spyOn(Database, 'query').and.returnValue(
      Promise.resolve({
        rows: [
          {
            id: 1,
            username: 'aml fakhri',
            firstname: 'aml',
            lastname: 'fakhri',
            email: 'aml_fakhri@gmail.com',
            password: '$2b$10$892rG1t4WJEEWjQNYz0fnegUB2ESyj1ZXOcAPS9V1o7GMJqTKQ1yS',
            country: 'egypt',
            phone: '021345457',
          },
        ],
      } as QueryResult)
    );
    const userResult = (await userDataAccess.findById(1)).data;
    expect(userResult).toEqual({
      id: 1,
      username: 'aml fakhri',
      firstname: 'aml',
      lastname: 'fakhri',
      email: 'aml_fakhri@gmail.com',
      password: '$2b$10$892rG1t4WJEEWjQNYz0fnegUB2ESyj1ZXOcAPS9V1o7GMJqTKQ1yS',
      country: 'egypt',
      phone: '021345457',
    });
  });

  it('findByCredentials (login) method should Finds the user with the given `username` and `password`', async () => {
    const result = (await userDataAccess.findByCredentials('aml fakhri 3', '223344')).data;
    expect(result).toEqual({
      id: 4,
      username: 'aml fakhri 3',
      firstname: 'aml',
      lastname: 'fakhri',
      email: 'aml_fakhri3@gmail.com',
      password: '$2b$10$YP2VgqFstbkLDwmWVOukDucTR2fvfMWVVQVcEpof69oHRyPdrG97q',
      country: 'egypt',
      phone: '021345457',
    });
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
