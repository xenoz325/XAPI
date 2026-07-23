const axios = require("axios");

module.exports = async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({
      creator: "Xeno",
      status: false,
      message: "URL kosong"
    });
  }

  try {
    let data = await axios.post("https://co.wuk.sh/api/json", { url }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (data.data && data.data.url) {
      return res.json({
        creator: "Xeno",
        status: true,
        result: {
          title: data.data.filename || "YouTube Video",
          download_url: data.data.url
        }
      });
    }

    res.json({
      creator: "Xeno",
      status: false,
      message: "Tautan media tidak ditemukan"
    });

  } catch (e) {
    res.json({
      creator: "Xeno",
      status: false,
      message: e.message
    });
  }
};    return res.status(500).json({
      status: false,
      message: "Gagal mengambil media YouTube",
      error: err.message
    });
  }
}
