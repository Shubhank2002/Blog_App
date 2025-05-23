import { useEffect,useState } from "react";
import React from "react";
import Header from "../header";
import Post from "../post";
import axios from "axios";

const Myblog = () => {
  const [post, setpost] = useState([])
  const [bool, setbool] = useState(true)
  useEffect(()=>{
    const res=axios.get('http://localhost:8000/api/posts',{withCredentials:true}).then(res=>{setpost(res.data.response), setbool(res.data.bool)})
    
    
  },[])
  return (
    <div>
      <main className="my-5">
        <Header bool={bool} setbool={setbool} />
        {post.length>0 && post.map(posts=>{
          return <Post key={posts._id} {...posts}/>
        })}
      </main>
    </div>
  );
};

export default Myblog;
