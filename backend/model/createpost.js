const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    content:String,
    cover:String,
    title:String,
    summary:String,
    userid:{type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})


const usermodel=mongoose.model('Post',userschema)

module.exports=usermodel