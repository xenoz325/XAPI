export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { text, format } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Parameter "text" wajib diisi!'
    });
  }

  const selectedFormat = (format && ['gif', 'mp4'].includes(format.toLowerCase())) 
    ? format.toLowerCase() 
    : 'mp4';

  try {
    const targetUrl = `https://api.blckrose.my.id/maker/bratvid?text=${encodeURIComponent(text)}&format=${selectedFormat}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        status: false,
        message: 'Gagal mengambil data dari server Brat Video'
      });
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(200).json(data);
    }

    const mediaBuffer = await response.arrayBuffer();
    const mimeType = selectedFormat === 'gif' ? 'image/gif' : 'video/mp4';

    res.setHeader('Content-Type', contentType || mimeType);
    return res.status(200).send(Buffer.from(mediaBuffer));

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Server error',
      error: error.message
    });
  }
}
