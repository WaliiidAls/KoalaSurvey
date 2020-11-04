const mongoose = require("mongoose");

const RatingSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    rating: {
      type: Number,
    },
    ipaddress: {
      type: String,
    },
    Employee: String,
  },
  {
    timestamps: true,
  }
);

const RatingModel = mongoose.model("Rating", RatingSchema);

module.exports = RatingModel;
