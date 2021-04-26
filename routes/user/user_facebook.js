const route=require('express').Router()

const passport=require('passport')
const Stategy=require('passport-facebook').Strategy
const {createuser}=require('../../controler/user')

const PORT=process.env.PORT||4444;


route.use(passport.initialize());
route.use(passport.session());
passport.serializeUser((user,cb)=>{
    cb(null,user);
});
passport.deserializeUser((obj,cb)=>{
    cb(null,obj);
});
let data={};
passport.use(new Stategy({
    clientID:'291648215795779',
    clientSecret:'a3b04a75ad1a4381b2a5307fa49fe7b0',
    callbackURL:`/f/fb/auth`,
    profileFields:['id','displayName','email']
},
(accessToken,refreshToken,profile,done)=>{
    console.log(accessToken,refreshToken,profile);
    // if user exits by id than login else save details to database

    // ther we have to add details to the database
    data=profile._json
    
    const user={};
    done(null,profile);
}
));

route.get('/failed',(req,res)=>{
    res.send('failedl to login')
})
route.use('/login',passport.authenticate('facebook',{scope:['email']}));
route.use('/fb/auth',passport.authenticate('facebook',{
    failureRedirect:'/failed'
}),async (req,res)=>{
    console.log(req.user,req.isAuthenticated())
    
    console.log('this is data' ,data) 
    const dat=await createuser(data.name,data.email,data.id,data.email)
    console.log(dat);
    req.session.user=dat.id;
    res.redirect('/')
})

route.get('/logout',(req,res)=>{
    req.logOut();
    res.send('userlogout')
})


module.exports={
    froute:route
}