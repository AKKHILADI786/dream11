const Sequelize=require('sequelize')
const data=Sequelize.DataTypes

const db=new Sequelize({
    dialect:'sqlite',
    storage:__dirname+'/database.db'
})

if(process.env.DATABASE_URL){
    db=new Sequelize(process.env.DATABASE_URL)
}

const users=db.define('user',{
    id:{
        type:data.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:data.STRING(30),
        allowNull:false
    },
    username:{
        type:data.STRING(30),
        unique:true,
        allowNull:false
    },
    email:{
        type:data.STRING(100) // always save password in form of hashes like md5 etc.
    },
    password:{
        type:data.STRING(30)
    }
})
const scoreboard=db.define('scoreboard',{
    id:{
        type:data.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    match:{
        type:data.STRING(100),
        allowNull:false
    },
    currscore:{
        type:data.FLOAT,
        allowNull:false
    }

})

const totalscore=db.define('totalscore',{
    id:{
        type:data.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    score:{
        type:data.FLOAT,
        defaultValue:0.0
    }
})

users.hasOne(scoreboard)
scoreboard.belongsTo(users)

users.hasOne(totalscore)
totalscore.belongsTo(users)

module.exports={
    db,users,scoreboard,totalscore
}