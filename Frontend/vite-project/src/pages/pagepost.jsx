import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PagePost = () => {
  const [userinfo, setuserinfo] = useState(null)
  const [pagepost, setpagepost] = useState(null);
  const { id } = useParams();
  const navigate=useNavigate()
  // console.log(id);

  useEffect(() => {
    const res = axios
      .get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
      .then((res) => {setpagepost(res.data.postdoc) ,setuserinfo(res.data.response)})
      .catch((err) => console.log(err));
  }, []);

  const handleDelete=()=>{
    const res=axios.get(`http://localhost:8000/api/delete/${id}`,{withCredentials:true})
    .then(res=>{if(res.status===200){
      navigate('/')
    }})
  }

  if (!pagepost) return " ";
  if(!userinfo) return " "



  return (
    <div>
      <header className="flex justify-around my-5 text-2xl underline">
        <Link to="/">My Blog</Link>
        <Link to="/createpost">Create New Post</Link>
        {userinfo.id===pagepost.userid && (
          <div>
            <Link to={`/editpost/${id}`}>Edit Post</Link>
            
          </div>
          
        )}
        {userinfo.id===pagepost.userid && (
          <div>
            <button className="underline" onClick={handleDelete}>Delete this Post</button>
            
          </div>
          
        )}
      </header>
      <div className="w-[70vw] mx-auto space-y-8 mt-15 text-center">
        <img src={`http://localhost:8000/${pagepost.cover}`} className="w-[60%] mx-auto h-[50vh]" alt="" />
        <div className="space-y-5">
          <h2>
            <strong>{pagepost.title}</strong>
          </h2>
          <div>
            {pagepost.summary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePost;
