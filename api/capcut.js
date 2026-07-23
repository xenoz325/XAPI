const axios = require("axios");

module.exports = async (req, res) => {

const url = req.query.url;

if(!url){

return res.json({

creator:"Xeno",
status:false,
message:"Masukkan URL CapCut"

});

}


try {


const response = await axios.post(

"https://snapvideotools.com/id/api/snap",

{
text:url
},

{

headers:{

"Content-Type":"application/json",

"Accept":"application/json, text/javascript, */*; q=0.01",

"X-Requested-With":"XMLHttpRequest",

"User-Agent":
"Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 Chrome/124.0 Mobile Safari/537.36",

"Referer":
"https://snapvideotools.com/id/capcut-downloader",

"Origin":
"https://snapvideotools.com"

}

}

);



const json = response.data;


if(json.code !== 0){

return res.json({

creator:"Xeno",

status:false,

message:"Gagal mengambil video"

});

}



const {
title,
cover,
mediaUrls
}=json.data;



res.json({

creator:"Xeno",

status:true,

platform:"CapCut",

result:{

title:title,

thumbnail:cover,

media:mediaUrls

}

});


}catch(error){


res.status(500).json({

creator:"Xeno",

status:false,

message:"CapCut downloader error",

error:error.message

});


}


};
