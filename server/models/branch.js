const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const BranchSchema = mongoose.Schema({
  slug: {
    type: String,
    default: uuidv4,
  },
  name: String,
});

BranchSchema.virtual("branch");

module.exports = mongoose.model("Branch", BranchSchema);
