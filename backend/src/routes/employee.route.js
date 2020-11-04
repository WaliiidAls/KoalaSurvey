const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const EmployeeModel = require("../models/employee.model");

router.get("/", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    return res.status(StatusCodes.OK).json({ employees });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeModel.findById(id);
    return res.status(StatusCodes.OK).json({ employee });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

module.exports = router;
