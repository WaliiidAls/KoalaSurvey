const crypto = require("crypto");

const HashPass = (password, salt) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

module.exports = HashPass;
