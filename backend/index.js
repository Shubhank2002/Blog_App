const express=require('express')
const cors=require('cors')
const cookieparser=require('cookie-parser')
const app=express()
const mongoose=require('mongoose')
const router=require('./routes/userrouter')
const path=require('path')

mongoose.connect('mongodb://localhost:27017/new_app')
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
    
}))
app.use('/uploads',express.static(path.join(__dirname,'uploads'))) 
   //tells express to serve files from uploads directry 
app.use('/api',router)


app.listen(8000,()=>console.log('server started at port=8000'))

//mongodb+srv:maheshwarishubhank2002:qlJlWateq4YBlVX9@cluster0.a9xv6es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0