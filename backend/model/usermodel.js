const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    email:{type:String,required:true,min:4},
    password:{type:String,required:true}
})

const usermodel=mongoose.model('user',userschema)

module.exports=usermodel