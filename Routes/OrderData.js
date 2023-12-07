const express = require('express');
const router = express.Router();
const Order=require('../models/Orders');
const User=require('../models/User')

router.post('/orderData',async(req,res)=>{
   

    let data = req.body.order_data;
    let serializedData = JSON.parse(JSON.stringify(data));
    await data.splice(0, 0, { Order_data: serializedData });
    
    const email=req.body.email;
    let eId=await Order.findOne({email})
    // console.log(eId);
    if(eId===null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
            
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message:"error",error});
            
            
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},
            {$push:{order_data:data}})
            .then(()=>{
                res.json({success:true})
            })
            
        } catch (error) {
            res.status(400).json({message:"error",error});
            
        }
    }
})

 router.post('/myorderData',async (req,res)=>{
  
    try {
        const email=req.body.email;
        const myData=await Order.findOne({email})
        console.log(myData);
        
        res.status(200).json({orderData:myData})
    } catch (error) {
        res.status(400).json({message:"error",error});
    }
 })
module.exports=router;