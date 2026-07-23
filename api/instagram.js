import axios from 'axios';

export async function handleInstagram(req, res) {
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
        message: "Berhasil mengambil media Instagram",
        result: {
          url: data.url
        }
      });
    }

    throw new Error("Tautan media tidak ditemukan");
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Gagal mengambil media Instagram",
      error: err.message
    });
  }
}headers:{

"accept":"*/*",

"content-type":"application/json",

"origin":"https://saveig.in",

"referer":"https://saveig.in/",

"x-visolix-nonce":"66b14bdf91",

"user-agent":"Mozilla/5.0"

},

timeout:60000

}

);



const json = response.data;


if(!json.status){

return res.json({

creator:"Xeno",

status:false,

message:"Media tidak ditemukan"

});

}



const html = json.data;


const results = [
...html.matchAll(
/href="([^"]*dl\.php\?id=[^"]+)"/g
)
]
.map(
m => m[1].replace(/&amp;/g,"&")
);



res.json({

creator:"Xeno",

status:true,

platform:"Instagram",

result:{

source:url,

total:results.length,

downloads:results

}

});


}catch(error){


res.status(500).json({

creator:"Xeno",

status:false,

message:"Gagal mengambil media Instagram",

error:error.message

});


}


};
