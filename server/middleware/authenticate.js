const jwt= require('jsonwebtoken');
const User= require('../models/userSchema')

const Authenticate= async (req, res, next)=>{
    try {
        const token= req.cookies.jwtoken;
        const verifytoken= jwt.verify(token,process.env.SECRET_KEY)
        
        const rootUser= await User.findOne({_id:verifytoken._id, "tokens.token":token})

        if(!rootUser){
            throw new Error("user not found")
        }
        req.token=token
        req.rootUser=rootUser
        req.userID=rootUser._id
        next();

    } catch (error) {
        res.status(401).send("Unauthorised access: Token not provided")
        console.log(error);
    }
}

module.exports=Authenticate