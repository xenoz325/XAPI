module.exports=(req,res)=>{

let number=req.query.number;

if(!number){
return res.json({
creator:"Xeno",
status:false,
message:"Nomor kosong"
});
}


let prefix=number.substring(0,5);


let operator="Unknown";


const list={

"62811":"Telkomsel",
"62812":"Telkomsel",
"62813":"Telkomsel",
"62821":"Telkomsel",
"62822":"Telkomsel",

"62817":"XL",
"62818":"XL",
"62819":"XL",

"62856":"Indosat",
"62857":"Indosat",
"62858":"Indosat",

"62877":"Axis",
"62878":"Axis",

"62895":"Tri",
"62896":"Tri"

};


operator=list[prefix]||"Tidak diketahui";


res.json({

creator:"Xeno",
status:true,
number:number,
operator:operator

});


};