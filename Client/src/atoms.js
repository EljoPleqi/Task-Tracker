import { atom } from 'recoil';

export const accessToken = atom({
  key: 'accessToken',
  default: '',
});

export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const user = atom({
  key: 'user',
  default: {},
});

export const tasks = atom({ key: 'tasks', default: [] });
