const { default: mongoose } = require("mongoose");

const lineStringSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["LineString"],
    require: true,
  },
  coordinates: {
    type: [[Number]],
    require: true,
  },
});

const TrackingSchema = mongoose.Schema({
  user: { type: Object, require: true },
  location: lineStringSchema,
});

module.exports = mongoose.model("Tracking", TrackingSchema);
