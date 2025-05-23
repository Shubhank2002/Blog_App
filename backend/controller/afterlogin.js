const usermodel=require('../model/createpost')

const fs=require('fs')
const secretkey='secret_key'
const jwt=require('jsonwebtoken')

async function createpost(req,res){
    const token=req.cookies.token
    const decode=jwt.verify(token,secretkey,{httpOnly:true})

    // const {path}=req.file
    const relativepath='uploads/'+req.file.filename

    const {title,content,summary}=req.body
    const file=req.file
    if(!file) return res.status(400).json({message:'no files uploaded'})
    const post=await usermodel.create({
        content,
        cover:relativepath,
        title,
        summary,
        userid:decode.id
    })

    return res.status(200).json({message:'post created successfully',file:file})

}

async function userposts(req,res) {
    const token=req.cookies.token
    console.log(token)
    const response=await usermodel.find().populate('userid','email').exec()
     console.log(response)
    let bool=true
    if(!token){
        bool=false
    }
    else if(token){
        try {
            const is_verified=jwt.verify(token,secretkey)
            console.log(is_verified)
            bool=true
        } catch (error) {
            bool=false
        }
        
    }
    return res.json({response,bool:bool})
}

async function userlogout(req,res) {
    try {
        res.clearCookie('token',{httpOnly:true})
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        return res.status(500).json({message:'logout error'})
    }
}

async function myposts(req,res) {
    const token=req.cookies.token
    const decode=jwt.verify(token,secretkey,{httpOnly:true})
    const posts=await usermodel.find({userid:decode.id})
    res.json({posts})

}

module.exports={createpost,userposts,userlogout,myposts}