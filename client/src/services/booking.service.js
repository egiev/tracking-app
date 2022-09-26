import { POST } from './api.service';

export const AddBooking = (data) => {
  return POST('/api/v1/booking', data);
};

export const StartJourney = (data) => {
  return POST('/api/v1/booking/start', data);
};
