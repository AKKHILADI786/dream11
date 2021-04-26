const data=require('./player.json')
const data2=require('./player copy.json')


async function getlist(){
    return {
        "player":data,
        "credit":data2
    }
}

module.exports={
    getlist
}

