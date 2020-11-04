const express = require("express");
const router = express.Router();
const RatingModel = require("../models/rating.model");
const EmployeeModel = require("../models/employee.model");
const { sendEmail } = require("../utils/Mail");
const { StatusCodes } = require("http-status-codes");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Messages = await RatingModel.find({ Employee: id });
    return res.status(StatusCodes.OK).json({ Messages });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.post("/:id", async (req, res) => {
  try {
    if (!(req.body.message && req.body.rating && req.body.ipaddress)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing parameters" });
    }
    const { id } = req.params;
    const newRating = new RatingModel({
      message: req.body.message,
      rating: req.body.rating,
      ipaddress: req.body.ipaddress,
      Employee: id,
    });
    await newRating.save();
    const employee = await EmployeeModel.findById(id);
    sendEmail(
      "KoalaSurvey <BarmejTest@gmail.com>",
      employee.email,
      "New rating",
      req.body.message
    );
    return res.status(StatusCodes.OK).json({ newRating });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

module.exports = router;
