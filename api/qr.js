const QRCode = require("qrcode");

module.exports = async (req,res)=>{

const text=req.query.text;

if(!text){
return res.status(400).json({
creator:"Xeno",
status:false,
message:"Text kosong"
});
}

const qr=await QRCode.toBuffer(text);

res.setHeader("Content-Type","image/png");
res.send(qr);

};