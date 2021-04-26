const express=require('express')
const expressSession=require('express-session')
const{db,users}=require('./database/model')

require('dotenv').config()

const app=express()
app.use(expressSession({
    resave:true,
    saveUninitialized:true,
    secret:'asfdasdfasdfsdfasdwqer'
}))

const PORT=process.env.PORT||4444;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',express.static(__dirname+'/public'))
app.use('/r',express.static(__dirname+'/public/register.html'))
app.use('/user',require('./routes/user/user').uroute)
app.use('/f',require('./routes/user/user_facebook').froute)
app.use('/m',require('./routes/match/match').mroute)
app.use('/s',require('./routes/scoreboard/scoreboard').sroute)


app.get('/',(req,res)=>{
    res.send('connected')
})



db.sync()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`The server is running on http://localhost:${PORT}`)
           
        })
    })
    .catch((err)=>console.log(err))