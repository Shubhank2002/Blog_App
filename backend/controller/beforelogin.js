const jwt=require('jsonwebtoken')
const usermodel=require('../model/usermodel')
const bcrypt=require('bcryptjs')
const secretkey='secret_key'

async function userlogin(req,res) {
    const {email,password}=req.body
    const user=await usermodel.findOne({email})
    if(!user) return res.status(400).json({message:'user does not exists'})

    const compare=await bcrypt.compare(password,user.password)  
    if(!compare) return res.status(400).json({message:'invalid password'})
    const token=jwt.sign({email,id:user._id},secretkey,{expiresIn:'1h'}) 
    res.cookie('token',token,{httpOnly:true})
    return res.status(200).json({message:'login success ',token})    
}

async function userregister(req,res) {
    const {email,password}=req.body
    const user=await usermodel.findOne({email})
    if(user) return res.status(401).json({message:"user already exists"})
    const hashpassword=await bcrypt.hash(password,10)
    const new_user=await usermodel.create({email,password:hashpassword})
    
    return res.status(200).json({message:'user created successfully ',hashpassword})
}



module.exports={userlogin,userregister}