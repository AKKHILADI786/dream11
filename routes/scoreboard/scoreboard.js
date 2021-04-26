const route = require('express').Router()
const { createscore,getscore,gettotal,creattotal} = require('../../controler/scoreboard')


route.post('/',async(req,res)=>{
    const data=await createscore(req.body.match,req.body.curr,req.body.user)
    res.send(data);
})
route.post('/t',async(req,res)=>{
    const data=await creattotal(req.body.total,req.body.user)
    res.send(data);
})
route.get('/:userId',async (req,res)=>{
    const data=await getscore(req.params.userId)
    res.send(data);
})
route.get('/t/:userId',async (req,res)=>{
    const data=await gettotal(req.params.userId)
    res.send(data);
})

module.exports={
    sroute:route
}