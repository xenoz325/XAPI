const QRCode = require("qrcode");

module.exports = async (req, res) => {

const text = req.query.text;

if(!text){

return res.status(400).json({

creator:"Xeno",

status:false,

message:"Text atau URL kosong"

});

}


try{


const qr = await QRCode.toBuffer(text, {

type:"png",

width:500,

margin:2,

color:{
dark:"#000000",
light:"#ffffff"
}

});


res.setHeader(
"Content-Type",
"image/png"
);


res.setHeader(
"Content-Disposition",
"inline; filename=xapi-qr.png"
);


res.send(qr);



}catch(error){


res.status(500).json({

creator:"Xeno",

status:false,

message:error.message

});


}


};
