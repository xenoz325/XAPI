const axios = require("axios");

module.exports = async (req, res) => {
  const text = req.query.text;
  const time = req.query.time || "23.16";
  const battery = req.query.battery || "64";
  const operator = req.query.operator || "INDOSAT";
  const signal = req.query.signal || "4";

  if (!text) {
    return res.json({
      creator: "Xeno",
      status: false,
      message: "Teks kosong"
    });
  }

  try {
    let apiUrl = `https://api.vreden.web.id/api/iqc?text=${encodeURIComponent(text)}`
      + `&time=${encodeURIComponent(time)}`
      + `&battery=${encodeURIComponent(battery)}`
      + `&operator=${encodeURIComponent(operator)}`
      + `&signal=${encodeURIComponent(signal)}`;

    let response = await axios.get(apiUrl);

    if (response.data && response.data.result) {
      return res.json({
        creator: "Xeno",
        status: true,
        result: {
          text: text,
          time: time,
          battery: `${battery}%`,
          operator: operator,
          signal: `${signal}/4`,
          url: response.data.result
        }
      });
    }

    res.json({
      creator: "Xeno",
      status: false,
      message: "Gagal membuat gambarnya"
    });

  } catch (e) {
    res.json({
      creator: "Xeno",
      status: false,
      message: e.message
    });
  }
};
