import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const Createpost = () => {
    const [form, setform] = useState({file:null,title:'',summary:''})
    const [content, setContent] = useState('')
    const navigate=useNavigate()

    const handleChange=(e)=>{
      setform({
        ...form,[e.target.name]:e.target.value
      })
    }    

    const modules={
      toolbar:[
        [{'header':[1,2,false]}],
        ['bold','italic','underline','strike','blockquote'],
        [{'list':'ordered'},{'list':'bullet'},{'indent':'+1'}],
        ['link','image'],
        ['clean']
      ]
    }

    const formats=['header','bold','italic','underline','strike','blockquote','list','indent','link','image']
    
    const handleUpload=async(e)=>{
        e.preventDefault()

        const formData=new FormData
        formData.append('file',form.file)
        formData.append('content',content)
        formData.append('title',form.title)
        formData.append('summary',form.summary)

        try {
            const res=await axios.post('http://localhost:8000/api/createpost',formData,{withCredentials:true})
            console.log(res.data.message+' '+res.data.file)
            if(res.status===200) {
              navigate('/')
            }

        } catch (error) {
            console.log(error.response.data.message)
        }

    }

  return (
    <div>
      <header className='w-[30%] mx-auto text-center text-3xl font-bold mt-5'>
        Create-Post
      </header>
      <form onSubmit={handleUpload} className='flex flex-col '>
        <input type="text" className='text-center mb-5 mt-10 border-t-2'  placeholder='title' name='title' value={form.title} onChange={handleChange} />
        <input type="text"  className='text-center mb-5' placeholder='summary' name='summary' value={form.summary} onChange={handleChange} />
        <input type="file" className='mb-5'  onChange={(e)=>setform({...form,file:e.target.files[0]})}/>
        <ReactQuill theme='snow' value={content} onChange={e=>setContent(e)} modules={modules} formats={formats}/>
        <button type='submit' className='cursor-pointer mt-5 bg-green-400 w-[50%] mx-auto rounded-2xl '>upload</button>
      </form>
    </div>
  )
}

export default Createpost
