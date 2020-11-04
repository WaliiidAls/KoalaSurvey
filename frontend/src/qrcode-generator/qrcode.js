import qrcode from "qrcode-generator";

const createQRCode = (id) => {
  const qr = qrcode(10, "L");
  qr.addData(`http://localhost:3000/rate/${id}`);
  qr.make();
  return qr.createImgTag();
};

export default createQRCode;
