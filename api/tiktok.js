import axios from 'axios';

export async function handleTiktok(req, res) {
  const { url } = req.query;

  if (!url || url.trim() === '') {
    return res.status(400).json({
      status: false,
      message: "Parameter 'url' wajib diisi!"
    });
  }

  try {
    const { data } = await axios.post('https://www.tikwm.com/api/', null, {
      params: { url, hd: 1 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (data && data.code === 0) {
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil data TikTok",
        result: {
          title: data.data.title,
          cover: data.data.cover,
          video_no_wm: data.data.play,
          video_wm: data.data.wmplay,
          music: data.data.music,
          author: {
            nickname: data.data.author.nickname,
            username: data.data.author.unique_id
          }
        }
      });
    }

    throw new Error(data.msg || "Gagal memproses URL TikTok");
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Gagal mengambil media TikTok",
      error: err.message
    });
  }
}
