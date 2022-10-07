const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    slug: { type: String, default: uuidv4() },
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
