export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Parameter "text" wajib diisi!'
    });
  }

  try {
    const targetUrl = `https://api.blckrose.my.id/maker/brat?text=${encodeURIComponent(text)}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        status: false,
        message: 'Gagal mengambil data dari server Brat'
      });
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(200).json(data);
    }

    const imageBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', contentType || 'image/png');
    return res.status(200).send(Buffer.from(imageBuffer));

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Server error',
      error: error.message
    });
  }
}
