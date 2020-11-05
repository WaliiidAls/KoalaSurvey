const mongoose = require("mongoose");
const shortid = require("shortid");
const HashPass = require("../utils/crypto");
const EmployeeModel = require("./employee.model");
const jwt = require("jsonwebtoken");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

CompanySchema.pre("save", async function (next) {
  this.salt = shortid.generate();
  this.password = HashPass(this.password, this.salt);
  const token = jwt.sign({ _id: this.id }, process.env.SECRET);
  this.tokens = this.tokens.concat({ token });
  next();
});

CompanySchema.method({
  PasswordMatch(password) {
    return HashPass(password, this.salt) === this.password;
  },
  async createEmployee(name, email, picture) {
    const newEmployee = new EmployeeModel({
      name,
      email,
      picture,
      CompanyId: this._id,
    });
    await newEmployee.save();
    this.updateOne(
      { $push: { employees: { name, email, id: newEmployee._id } } },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    await this.save();
    return newEmployee;
  },
});

const CompanyModel = mongoose.model("Company", CompanySchema);

module.exports = CompanyModel;
