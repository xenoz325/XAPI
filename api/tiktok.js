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
    let data = await axios.post("https://www.tikwm.com/api/", null, {
      params: { url: url, hd: 1 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (data.data && data.data.code === 0) {
      return res.json({
        creator: "Xeno",
        status: true,
        result: {
          title: data.data.data.title,
          cover: data.data.data.cover,
          video_no_wm: data.data.data.play,
          video_wm: data.data.data.wmplay,
          music: data.data.data.music,
          author: {
            nickname: data.data.data.author.nickname,
            username: data.data.data.author.unique_id
          }
        }
      });
    }

    res.json({
      creator: "Xeno",
      status: false,
      message: data.data.msg || "Gagal mengambil data TikTok"
    });

  } catch (e) {
    res.json({
      creator: "Xeno",
      status: false,
      message: e.message
    });
  }
};    }

    throw new Error(data.msg || "Gagal memproses URL TikTok");
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Gagal mengambil media TikTok",
      error: err.message
    });
  }
}
