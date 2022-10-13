import { GET, PATCH, POST } from "./api.service";

export const AddBooking = (data) => {
  return POST("/api/v1/booking", data);
};

export const FetchBookings = () => {
  return GET("/api/v1/booking");
};

export const ChangeBookingStatus = (data) => {
  return PATCH("/api/v1/booking/change-status", data);
};

export const StartTracking = (data) => {
  return POST("/api/v1/booking/start", data);
};
