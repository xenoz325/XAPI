const axios = require("axios");
const cheerio = require("cheerio");

const base = "https://tiktokio.com/api/v1/tk/html";

module.exports = async (req, res) => {

const url = req.query.url;

if(!url){

return res.json({

creator:"Xeno",
status:false,
message:"Masukkan URL TikTok"

});

}


try {


const session = await axios.get(
"https://tiktokio.com/",
{
headers:{
"User-Agent":"Mozilla/5.0"
}
}
);


const cookies = session.headers["set-cookie"]
?
session.headers["set-cookie"].join("; ")
:
"";


const response = await axios.post(

base,

{
vid:url,
prefix:"tiktokio.com"
},

{

headers:{

"Content-Type":"application/json",

"Cookie":cookies,

"Origin":"https://tiktokio.com",

"Referer":"https://tiktokio.com/",

"User-Agent":
"Mozilla/5.0"

}

}

);



const $ = cheerio.load(response.data);



let links=[];


$(".download-links a").each((i,el)=>{

const link=$(el).attr("href");

const type=$(el).text().trim();


if(link){

links.push({

type:type,

url:link

});

}

});



res.json({

creator:"Xeno",

status:true,

platform:"TikTok",

result:{


title:
$(".video-info h3")
.text()
.trim(),


thumbnail:
$(".video-info img")
.attr("src") || null,


downloads:links


}

});



}catch(error){


res.status(500).json({

creator:"Xeno",

status:false,

message:"Gagal mengambil video TikTok",

error:error.message

});


}


};
