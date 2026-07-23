const axios=require("axios");

module.exports=async(req,res)=>{

const ip=req.query.ip;

if(!ip){
return res.json({
creator:"Xeno",
status:false,
message:"IP kosong"
});
}

try{

let data=await axios.get(
`https://ipapi.co/${ip}/json/`
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
message:e.message
});

}

};