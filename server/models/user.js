const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    token: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("virtualBranch", {
  ref: "Branch",
  localField: "branch",
  foreignField: "slug",
});

module.exports = mongoose.model("user", UserSchema);
