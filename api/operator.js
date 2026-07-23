module.exports = (req, res) => {

const input = req.query.number;

if (!input) {
return res.json({
creator:"Xeno",
status:false,
message:"Nomor tidak ditemukan"
});
}


let number = input.replace(/\D/g,"");


if(number.startsWith("0")){
number = "62" + number.substring(1);
}


if(!number.startsWith("62")){
return res.json({
creator:"Xeno",
status:false,
message:"Hanya mendukung nomor Indonesia"
});
}


const prefix = number.substring(0,5);


const database = {

"62811":{
operator:"Telkomsel",
brand:"Kartu Halo",
type:"Mobile",
category:"Postpaid"
},

"62812":{
operator:"Telkomsel",
brand:"Simpati",
type:"Mobile",
category:"Prepaid"
},

"62813":{
operator:"Telkomsel",
brand:"Simpati",
type:"Mobile",
category:"Prepaid"
},

"62821":{
operator:"Telkomsel",
brand:"Loop",
type:"Mobile",
category:"Prepaid"
},

"62822":{
operator:"Telkomsel",
brand:"Simpati",
type:"Mobile",
category:"Prepaid"
},

"62823":{
operator:"Telkomsel",
brand:"Simpati",
type:"Mobile",
category:"Prepaid"
},


"62817":{
operator:"XL Axiata",
brand:"XL",
type:"Mobile",
category:"Prepaid"
},

"62818":{
operator:"XL Axiata",
brand:"XL",
type:"Mobile",
category:"Prepaid"
},

"62819":{
operator:"XL Axiata",
brand:"XL",
type:"Mobile",
category:"Prepaid"
},


"62855":{
operator:"Indosat",
brand:"Matrix",
type:"Mobile",
category:"Postpaid"
},

"62856":{
operator:"Indosat",
brand:"IM3",
type:"Mobile",
category:"Prepaid"
},

"62857":{
operator:"Indosat",
brand:"IM3",
type:"Mobile",
category:"Prepaid"
},


"62877":{
operator:"Axis",
brand:"Axis",
type:"Mobile",
category:"Prepaid"
},

"62878":{
operator:"Axis",
brand:"Axis",
type:"Mobile",
category:"Prepaid"
},


"62895":{
operator:"Tri",
brand:"3 Indonesia",
type:"Mobile",
category:"Prepaid"
},

"62896":{
operator:"Tri",
brand:"3 Indonesia",
type:"Mobile",
category:"Prepaid"
},

"62897":{
operator:"Tri",
brand:"3 Indonesia",
type:"Mobile",
category:"Prepaid"
},


"62831":{
operator:"Smartfren",
brand:"Smartfren",
type:"Mobile",
category:"Prepaid"
},

"62888":{
operator:"Smartfren",
brand:"Smartfren",
type:"Mobile",
category:"Prepaid"
}

};



let info = database[prefix] || {

operator:"Unknown",
brand:"Unknown",
type:"Mobile",
category:"Unknown"

};


let valid =
number.length >= 11 &&
number.length <= 13;



res.json({

creator:"Xeno",

status:true,

checked_at:new Date().toISOString(),

result:{


original_number:input,

normalized_number:number,

international_format:"+"+number,


country:{
name:"Indonesia",
code:"ID",
calling_code:"+62"
},


network:{

operator:info.operator,

brand:info.brand,

type:info.type,

category:info.category

},


number_info:{

prefix:prefix,

length:number.length,

valid_format:valid

},


location:{

country:"Indonesia",
region:"Unknown"

},


note:
"Information detected from phone number prefix"


}


});


};
