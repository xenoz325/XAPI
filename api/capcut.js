import axios from 'axios';

export async function handleCapcut(req, res) {
  const { url } = req.query;

  if (!url || url.trim() === '') {
    return res.status(400).json({
      status: false,
      message: "Parameter 'url' wajib diisi!"
    });
  }

  try {
    const { data } = await axios.post('https://co.wuk.sh/api/json', { url }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (data && data.url) {
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil media CapCut",
        result: {
          title: data.filename || "CapCut Video",
          download_url: data.url
        }
      });
    }

    throw new Error("Tautan media tidak ditemukan");
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Gagal mengambil media CapCut",
      error: err.message
    });
  }
}
