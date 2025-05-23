const multer=require('multer')
const path=require('path')

const uploadpath=path.join(__dirname,'..','uploads')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadpath)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'- '+file.originalname)
    }
})

const upload=multer({storage:storage})

module.exports=upload