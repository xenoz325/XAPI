const axios = require("axios");

module.exports = async (req, res) => {
  const url = req.query.url;
  const device = req.query.device || "desktop";
  const full_page = req.query.full_page || "false";

  if (!url) {
    return res.json({
      creator: "Xeno",
      status: false,
      message: "URL kosong"
    });
  }

  let viewportWidth = 1280;
  let viewportHeight = 800;
  let isMobile = false;

  const deviceLower = device.toLowerCase();
  if (deviceLower === "mobile") {
    viewportWidth = 375;
    viewportHeight = 812;
    isMobile = true;
  } else if (deviceLower === "tablet") {
    viewportWidth = 768;
    viewportHeight = 1024;
    isMobile = true;
  }

  const isFullPage = full_page.toString().toLowerCase() === "true";

  try {
    let apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`
      + `&screenshot=true`
      + `&embed=screenshot.url`
      + `&viewport.width=${viewportWidth}`
      + `&viewport.height=${viewportHeight}`
      + `&viewport.isMobile=${isMobile}`
      + `&screenshot.fullPage=${isFullPage}`;

    let data = await axios.get(apiUrl);

    if (data.data && data.data.data && data.data.data.screenshot) {
      return res.json({
        creator: "Xeno",
        status: true,
        result: {
          target_url: url,
          device: deviceLower,
          full_page: isFullPage,
          screenshot_url: data.data.data.screenshot.url
        }
      });
    }

    res.json({
      creator: "Xeno",
      status: false,
      message: "Gagal mengambil screenshot"
    });

  } catch (e) {
    res.json({
      creator: "Xeno",
      status: false,
      message: e.message
    });
  }
};
