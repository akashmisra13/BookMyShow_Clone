const express= require("express");
const jwt=require("jsonwebtoken");
const router= express.Router();
const bcrypt=require("bcrypt");
const authenticate= require('../middleware/authenticate')


// connect to database
require('../DataBase/conn');
const User= require('../models/userSchema')

router.get('/register', (req,res)=>{
    res.send("hello from auth register")
})
// Register route
router.post('/register',async (req,res)=>{

    const {name,email,phone,password,cpassword}=req.body;

    if(!name || !email || !phone|| !password || !cpassword){
         res.status(422).json({error: "plz filled properly"})
    }

    try {
        const userExist= await User.findOne({email:email});

        if(userExist){
          return res.status(422).json({error: "already registered"})
        }else if(password!=cpassword){
          return res.status(422).json({error: "entered password not matching"})
        }else{
            const user=new User({name,email,phone,password,cpassword});

        // password hash here after getting value and pre save
            // pre fn call in userschema
        const newUser= await user.save();
        return   res.status(200).json({message:"sucessfully registered", newUser})
        }
    } catch (err) {
        res.status(500).json(err);
    }
    
});



// login route

router.post('/signin', async (req,res)=>{
    try {
       let token;
        // destructuring
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({error:"plz fill the login form"})
        }

        // check if email not present in database
        const userLogin= await User.findOne({email: email});
       // console.log(userLogin) // this gives all data related to that email

       

        if(userLogin){
            // now have to verify user password entered is matching with old or not
            const ismatch=await bcrypt.compare(password, userLogin.password)

             // generating jwt token and store cookie after match
             token=await userLogin.generateAuthToken();
            //  console.log(token);

            // storing token in cookie as jwtoken on server for later user verification 

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now()+258920000000),
                httpOnly:true
            });
            

            if(!ismatch){
                res.status(400).json({err:"invalid credentials"})
            }else{
                res.json({message:"sign in successfully"})
            }
        }
        else{
            res.status(400).json({err:"invalid credentials"})
        }
    
    } catch (err) {
        res.status(500).json(err)
    }
})

// // for user authentication after login , verifying token in middleware authenticate .js 

// router.get('/about',authenticate,(req,res)=>{
//     //   console.log("hello world from about");
//        res.send(req.rootUser);
//      })

// // get user data for contact and home page

// router.get('/getdata',authenticate,(req,res)=>{
//         res.send(req.rootUser); // sending all the data to fetch api calls from home and contact
//     })

//     // contact us page 
// router.post('/contact' ,authenticate, async (req,res)=>{
//         try {
            
//             const {name, email, phone, message}=req.body;

//             if(!name || !email || !phone || !message){
//                 return res.json({error:"plzz fill the form"})
//             }

//             // matching the id with our database id(req.userID)
//             const userContact= await User.findOne({_id:req.userID})

//             // if matches ,then sending message to database
//             if(userContact){

//                 const userMessage= await userContact.addMessage(name,email,phone,message);

//                 await userContact.save();
//                 res.status(201).json({message:"contact page loading.."})
//             }

//         } catch (err) {
//             console.log(err);
//         }
//     })
//     // logout page
//     router.get('/logout',(req,res)=>{
//           console.log("user logout successfull");
//           res.clearCookie('jwtoken',{path: '/'})
//            res.status(200).send("user logout");
//          })
module.exports=router;