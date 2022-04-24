import { userDataAccess } from '../data/user/data/user.data';
import { Hash } from './../shared/utils/hash.util';

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
const [findByIdUserResult, loginResult] = [
  {
    data: {
      id: createResult.data.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: createResult.data.password,
      country: user.country,
      phone: user.phone,
    },
    isNotFound: false,
  },
  {
    data: {
      user: {
        id: createResult.data.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: createResult.data.password,
        country: user.country,
        phone: user.phone,
      },
      jwt: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzODUyM2M4LTdkZDEtNDllZS1hZDUyLTkyNTVjYjcwMzU3NSIsInVzZXJJZCI6MSwiaWF0IjoxNjUwNzkyMTY1LCJleHAiOjE2NTMzODQxNjV9.0T0VMJcp4YZ6ZLCez4VQkJDT6UyKrcP8x7WxUVniDZc',
        issuedAt: '2022-04-24T09:22:45.000Z',
        expiresAt: '2022-05-24T09:22:45.000Z',
      },
    },
  },
];

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

  it('create method should add a user', async () => {
    const result = (await userDataAccess.create(user)).data;
    console.log(result);

    expect(result).toEqual(createResult.data);
  });

  it('findById method should return a specific user', async () => {
    const userResult = (await userDataAccess.findById(createResult.data.id)).data;
    expect(userResult).toEqual(findByIdUserResult.data);
  });

  it('findByCredentials (login) method should Finds the user with the given `username` and `password`', async () => {
    const result = (await userDataAccess.findByCredentials(user.username, user.password)).data;
    expect(result).toEqual(loginResult.data.user);
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
