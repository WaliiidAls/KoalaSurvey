const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
    },
    CompanyId: String,
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel;
