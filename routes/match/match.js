const route=require('express').Router()

const {getplayers}=require('../../utills/jsonp')
const {getlist,getcredit}=require('../../utills/player')


route.get('/',async (req,res)=>{
    //var team1={},team2={};
   const data=await getplayers();
   //console.log(typeof(data[0]));
    // const dat=await solve(data);
    
    res.send(data);
    
})
route.get('/mm',async(req,res)=>{
    const data=await getlist();
    res.send(data);
})






module.exports={mroute:route}