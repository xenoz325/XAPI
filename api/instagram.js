const axios = require("axios");

const API = "https://saveig.in/wp-json/visolix/api/download";

module.exports = async (req, res) => {

const url = req.query.url;

if(!url){

return res.json({

creator:"Xeno",
status:false,
message:"Masukkan URL Instagram"

});

}


try{


const response = await axios.post(

API,

{
url:url,
format:"",
captcha_response:null
},

{

headers:{

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
