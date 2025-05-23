const express=require('express')
const router=express.Router()
const usercontroller1=require('../controller/beforelogin')
const usercontroller2=require('../controller/afterlogin')
const upload=require('../middleware/filesupload')
const usermodel=require('../model/createpost')
const jwt=require('jsonwebtoken')
const secretkey='secret_key'

router.post('/login',usercontroller1.userlogin)

router.post('/register',usercontroller1.userregister)

router.post('/createpost',upload.single('file'),usercontroller2.createpost)

router.get('/posts',usercontroller2.userposts)

router.get('/logout',usercontroller2.userlogout)

router.get('/mypost',usercontroller2.myposts)

router.get('/post/:id',async(req,res)=>{
    const token=req.cookies.token
    const response=jwt.verify(token,secretkey)
    console.log(response)
    const {id}=req.params
    const postdoc=await usermodel.findById(id)
    console.log(postdoc)
    res.json({postdoc,response:response})
})

router.post('/editpost',upload.single('file'),async(req,res)=>{
    const {id,title,summary}=req.body
    
    const relativepath='uploads/'+req.file.filename
    const updates={title,summary}
    if(req.file){
        updates.cover=relativepath
    }
    try {
        const edit=await usermodel.updateOne({_id:id},updates)
        res.status(200).json({message:'updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'unsuccessfull '+error})
    }
    
    res.status()
})

router.get('/delete/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const del=await usermodel.deleteOne({_id:id})
        res.status(200).json({message:'deleted sucessfully'})
    } catch (error) {
        res.status(400).json({message:'error: '+error})
    }

})

module.exports=router