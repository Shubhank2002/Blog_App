import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Post from '../post'
import { Link,useNavigate } from 'react-router-dom'


const Mypost = () => {
    const [post, setpost] = useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const res=axios.get('http://localhost:8000/api/mypost',{withCredentials:true}).then(res=>setpost(res.data.posts))
    },[])

    const handleClick=()=>{
        const res=axios.get('http://localhost:8000/api/logout',{withCredentials:true})
        navigate('/login')
    }

  return (
    <div>
        <header className='flex mb-20 justify-around text-3xl font-bold mt-5'>
            <Link to='/'>My Blog</Link>
            <div>
                <button onClick={handleClick} className='cursor-pointer'>Logout</button>
            </div>
        </header>
      {post.length>0 && post.map(posts=>{
        return <Post key={posts._id} {...posts}/>
      })}
    </div>
  )
}

export default Mypost
