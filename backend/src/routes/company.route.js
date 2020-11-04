const CompanyModel = require("../models/company.model");
const EmployeeModel = require("../models/employee.model");
const { create } = require("../utils/validation");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/Mail");
const express = require("express");
const router = express.Router();
const { Auth } = require("../utils/middleware");

router.get("/all", Auth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "Bad SessionID format" });
    }
    const company = await CompanyModel.findById(decodedToken._id);
    if (!company) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Company not found" });
    }
    const employees = await EmployeeModel.find({ CompanyId: company._id });
    return res.status(StatusCodes.OK).send({ company, employees });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { ID } = req.params;
    const company = await CompanyModel.findById(ID);
    if (!company) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Company not found" });
    }
    const employees = await EmployeeModel.find({ CompanyId: company._id });
    return res.status(StatusCodes.OK).send({ employees });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const validation = create.body.validate(req.body);
    if (validation.error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: validation.error.details[0].message });
    }
    const newCompany = new CompanyModel({
      name,
      email,
      password,
    });
    sendEmail(
      "KoalaSurvey <BarmejTest@gmail.com>",
      email,
      "Welcome",
      `Dear ${newCompany.name}, \n KoalaSurvery team wants to wish you a good luck with our services, thanks for registering with us \n Best regards, \n -Koala Survery CEO's (Waleed and Mohammad)`
    );
    await newCompany.save();
    return res.status(StatusCodes.CREATED).json(newCompany.tokens);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const validation = create.auth.validate(req.body);
    if (validation.error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: validation.error.details[0].message });
    }
    const company = await CompanyModel.findOne({ email });
    if (!company) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Company not found" });
    }
    if (!company.PasswordMatch(password)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Password doesn't match" });
    }
    sendEmail(
      "KoalaSurvey <BarmejTest@gmail.com>",
      email,
      "Welcome",
      `Dear ${name}, \n We recognized an attempt to login if it wasn't you please reply to this email as soon as possible to reset the account's password \n Best regards, \n -Koala Survery CEO's (Waleed and Mohammad)`
    );
    return res.status(StatusCodes.OK).json(company.tokens);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.post("/new", Auth, async (req, res) => {
  try {
    const { name, email, picture } = req.body;
    const token = req.headers.authorization;
    const validation = create.employee.validate(req.body);
    if (validation.error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: validation.error.details[0].message });
    }
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "Bad SessionID format" });
    }
    const company = await CompanyModel.findById(decodedToken._id);
    if (!company) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Company not found" });
    }
    const newEmployee = await company
      .createEmployee(name, email, picture)
      .catch((err) => {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: err });
      });

    return res.status(StatusCodes.CREATED).send(newEmployee);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.put("/edit", Auth, async (req, res) => {
  const body = req.body;
  const token = req.headers.authorization;
  const validation = create.edit.validate(body);
  if (validation.error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: validation.error.details[0].message });
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Bad SessionID format" });
  }
  const company = await CompanyModel.findById(decodedToken._id);
  if (!company) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Company not found" });
  }
  if (body.name) company.name = body.name;
  if (body.email) company.email = body.email;
  if (body.password) company.password = body.password;
  await company.save();
  return res.status(StatusCodes.OK).json({ Message: "Updated successfully" });
});

router.put("/edit/:id", Auth, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const token = req.headers.authorization;
  const validation = create.edit.validate(body);
  if (validation.error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: validation.error.details[0].message });
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Bad SessionID format" });
  }
  const company = await CompanyModel.findById(decodedToken._id);
  if (!company) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Company not found" });
  }
  const employee = await EmployeeModel.findById(id);
  if (!employee) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Employee not found" });
  }
  if (!employee.CompanyId == company._id) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Insufficient permissions" });
  }
  if (body.name) employee.name = body.name;
  if (body.email) employee.email = body.email;
  if (body.picture) employee.picture = body.picture;
  await employee.save();
  return res.status(StatusCodes.OK).json({ Message: "Updated successfully" });
});

router.delete("/delete/:id", Auth, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const token = req.headers.authorization;
  const validation = create.edit.validate(body);
  if (validation.error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: validation.error.details[0].message });
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Bad SessionID format" });
  }
  const company = await CompanyModel.findById(decodedToken._id);
  if (!company) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Company not found" });
  }
  const employee = await EmployeeModel.findById(id);
  if (!employee) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Employee not found" });
  }
  if (!employee.CompanyId == company._id) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Insufficient permissions" });
  }

  await employee.deleteOne();
  return res.status(StatusCodes.OK).json({ Message: "Deleted successfully" });
});

module.exports = router;
