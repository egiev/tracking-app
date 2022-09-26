const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  slug: { type: String, default: uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  companions: { type: Number, required: true },
  date_of_arrival: { type: String, required: true },
  date_of_departure: { type: String, required: true },
  status: { type: String, default: null },
  code: { type: String, default: null },
  created_at: { type: String, default: Date },
});

module.exports = mongoose.model('booking', BookingSchema);
