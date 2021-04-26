const {db,users} =require('../database/model');



async function createuser(name,username,password,email){
   
    const data=await users.create({
        name,username,password,email
    },{
        ignoreDuplicates:true
    })
    return data;
}

async function getuser(){
    const data=await users.findAll({});
    return data;
}

async function getbyusername(username){
    const data=await users.findAll({
        where:{
            username:username
        }
    })
    return data;
}

module.exports={
    createuser,
    getuser,
    getbyusername
}