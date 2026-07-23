const QRCode = require("qrcode");

module.exports = async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.json({
      creator: "Xeno",
      status: false,
      message: "Text kosong"
    });
  }

  try {
    let qrDataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 300
    });

    res.json({
      creator: "Xeno",
      status: true,
      result: qrDataUrl
    });

  } catch (e) {
    res.json({
      creator: "Xeno",
      status: false,
      message: e.message
    });
  }
};
