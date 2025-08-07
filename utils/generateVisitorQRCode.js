import QRCode from "qrcode";

export async function generateVisitorQRCode(visitorId) {
  const data = `http://localhost:3002/visitors/${visitorId}`;
  const qrImage = await QRCode.toDataURL(data);
  return qrImage;
}
