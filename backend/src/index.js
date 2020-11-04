const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const port = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOURI || "";

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 250,
    message: "Too many requests",
    headers: false,
  })
);
app.use(helmet());

const CompanyRoute = require("./routes/company.route");
const EmployeeRoute = require("./routes/employee.route");
const RatingRoute = require("./routes/rating.route");

app.use("/company", CompanyRoute);
app.use("/employee", EmployeeRoute);
app.use("/rating", RatingRoute);

if (MONGOURI != "") {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB connection established successfully");
  });
}

app.listen(port, () => {
  console.log(`Starting application on port: ${port}`);
});
