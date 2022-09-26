import { POST } from './api.service';

export const Authenticate = (credentials) => {
  return POST('/api/v1/auth/login/', credentials);
};
