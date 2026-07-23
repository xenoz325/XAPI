import QRCode from 'qrcode';

export async function handleQr(req, res) {
  const { text } = req.query;

  if (!text || text.trim() === '') {
    return res.status(400).json({
      status: false,
      message: "Parameter 'text' wajib diisi!"
    });
  }

  try {
    const qrDataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 300
    });

    return res.status(200).json({
      status: true,
      message: "Berhasil membuat QR Code",
      result: qrDataUrl
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Gagal membuat QR Code",
      error: err.message
    });
  }
}
