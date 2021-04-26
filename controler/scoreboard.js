const {db,users,scoreboard,totalscore} =require('../database/model');


async function createscore(match,currscore,userId){
    const data=await scoreboard.create({
        match,currscore,userId
    })
    return data;
}
async function getscore(userId){
    const data=await scoreboard.findAll({
        order:[
            ['id','DESC']
        ],
        where:{
            userId:userId
        }
    })
    return data;
}
async function creattotal(score,userId){
    // const data=await totalscore.findAll({
    //     where:{
    //         id:userId
    //     }
    // })
    // //data.score=score;
    // await data.destroy();
    await totalscore.destroy({
        where:{
            userId:userId
        }
    })
    data=await totalscore.create({
        score,userId
    })
    
    return data;
}
async function gettotal(userId){
    const data=await totalscore.findAll({
        where:{
            userId:userId
        }
    })
    return data;
}



module.exports={
    createscore,getscore,gettotal,creattotal
}