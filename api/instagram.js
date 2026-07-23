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

let data=await axios.get(
`https://api.socialsdownloader.com/api/instagram?url=${encodeURIComponent(url)}`
);


res.json({

creator:"Xeno",
status:true,
result:data.data

});


}catch(e){

res.json({

creator:"Xeno",
status:false,
message:"Gagal download"

});

}

};