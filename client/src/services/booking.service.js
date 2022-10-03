import { POST } from "./api.service";

export const AddBooking = (data) => {
  return POST("/api/v1/booking", data);
};

export const StartTracking = (data) => {
  return POST("/api/v1/booking/start", data);
};
