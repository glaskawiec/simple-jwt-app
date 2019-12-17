import User from './interfaces/User';

const users: Array<User> = [
  {
    email: 'example@mail.com',
    password: '1234',
    token: '',
    privKey: '',
    pubKey: '',
  },
  {
    email: 'example2@mail.com',
    password: '1234',
    token: '',
    privKey: '',
    pubKey: '',
  },
];

export const associateToken = (email: string, token: string) => {
  const objIndex = users.findIndex(((user) => user.email === email));
  users[objIndex].token = token;
};

export const associateKeys = (email: string, privKey: string, pubKey: string) => {
  const objIndex = users.findIndex(((user) => user.email === email));
  users[objIndex].privKey = privKey;
  users[objIndex].pubKey = pubKey;
};

export const getKeys = (email: string) => {
  const objIndex = users.findIndex(((user) => user.email === email));

  const { privKey, pubKey } = users[objIndex];
  return {
    privKey,
    pubKey,
  };
};

export const isTokenValid = (email: string, token: string) => {
  const objIndex = users.findIndex(((user) => user.email === email));
  return users[objIndex].token === token;
};

// eslint-disable-next-line max-len
export const searchUser = (email: string, password: string) => users.find((user) => user.email === email && user.password === password);
