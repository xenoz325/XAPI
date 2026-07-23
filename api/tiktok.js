const axios=require("axios");

module.exports=async(req,res)=>{

const url=req.query.url;


if(!url){

return res.json({
creator:"Xeno",
status:false,
message:"URL kosong"
});

}


try{

let api=await axios.get(
`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`
);


res.json({

creator:"Xeno",
status:true,
result:api.data

});


}catch(e){

res.json({

creator:"Xeno",
status:false,
message:"Gagal mengambil video"

});

}

};