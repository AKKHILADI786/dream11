
const fs = require('fs');


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

var val=0;


getplayers();


async function getplayers(){
    val=getRandomInt(1,232);
    const dream=require(`./JSON Files/1 (${val}).json`)   
    //const inning1 = dream.innings[0]["1st innings"]["deliveries"];
       
    

  return dream;    
        // return team1;
    
}





async function solve(temp){

    let inning = new Set();

 

    for(let j = 0; j<temp.length; j++){

        let ball = Object.keys(temp[j])[0];
        //console.log(ball)

        let b = {

            over :  Object.keys(temp[j])[0],

            score : temp[j][ball]

        }
        //console.log(b)
        inning.add(b.score.batsman);

    }

    return inning;

}











module.exports={
    getplayers
}
 //first--- first team-> total batsman in diff set

// same as second one  -> 2nd batsman

 

// total score as diff innings

//+ 

 

//User:

/*

{

    "name":"",

    "email":"",

    "password":"",

    "phoneNumber":"",

    "currentMatch":{

            "wickets":"",

            "scores":""

            },

    "wins":"",

    "lose":"",

    "points:""

}

 

player:

{

    "_id":"",

    "selection":[]

}

 

*/

    // console.log(batsmans);

    // console.log(bowlers);










































 // console.log(dream.info.teams[0]);
    
        // console.log(dream.info.teams[1]);
    
        // console.log("toss winning by : " , dream.info.toss.winner);
    
        // console.log("toss winner chooses : " , dream.info.toss.decision);




// const data=require('./JSON Files/1 (1).json')


// let teams=data.info.teams
// const aa='0.5'
// let first=data.innings[0]['1st innings'].deliveries // for acces the deliveries
// let a=0;
// let b=1;
// for(p of first){
//     console.log(`${a}.${b}`)
//     let ball=`${a}.${b}`;
//     //console.log(d)
//     if(b==6){
//         b=1;
//         a++;
//     }
//     else{
//         b++;
//     }
    
// }

// console.log(a)
// // console.log(teams)
// // console.log(first)