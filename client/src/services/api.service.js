import axios from 'axios';

import { BASE_URI } from '../config';

axios.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return config;
  } catch (error) {
    return config;
  }
});

export const POST = (url, payload, headers) => {
  return axios.post(`${BASE_URI}${url}`, payload, { headers });
};

export const GET = (url, options) => {
  return axios.get(`${BASE_URI}${url}`, options);
};

export const PATCH = (url, payload) => {
  return axios.patch(`${BASE_URI}${url}`, payload);
};
