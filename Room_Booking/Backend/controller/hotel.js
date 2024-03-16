const Hotel=require('../models2/hotel.js');
//insert into database
const createHotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body);
    const savedHotel=await newHotel.save();
    res.status(200).json(savedHotel)
}
//update
const updateHotel=async(req,res)=>{
    const updateHotel2=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json( updateHotel2)
}
const deleteHotel=async(req,res)=>{
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("deleteHotel")

}
//get
const getbyId=async(req,res)=>{
    const hotel= await Hotel.findById(req.params.id);
      res.status(200).json(hotel)
  
  }
  //get all
  const getAll=async(req,res)=>{
    const hotel= await Hotel.find();
     res.status(200).json(hotel)
 
 }
module.exports.createHotel=createHotel;
module.exports.deleteHotel=deleteHotel;
module.exports.updateHotel=updateHotel;
module.exports.getbyId=getbyId;
module.exports.getAll=getAll;
                   
