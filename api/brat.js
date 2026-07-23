const { createCanvas } = require("canvas");

module.exports = async (req, res) => {
  const text = req.query.text;
  const isWhite = req.query.white === "true";

  if (!text) {
    return res.json({
      creator: "Xeno",
      status: false,
      message: "Teks kosong"
    });
  }

  try {
    const width = 500;
    const height = 500;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = isWhite ? "#ffffff" : "#8ace00";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#000000";
    ctx.font = "normal 68px 'Arial Narrow', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cleanText = text.toLowerCase();

    ctx.filter = "blur(1px)";
    ctx.fillText(cleanText, width / 2, height / 2);

    const imageBuffer = canvas.toBuffer("image/png");
    const base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    res.json({
      creator: "Xeno",
      status: true,
      result: {
        text: cleanText,
        image: base64Image
      }
    });

  } catch (e) {
    res.json({
      creator: "Xeno",
      status: false,
      message: e.message
    });
  }
};
