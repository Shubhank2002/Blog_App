import React from "react";
import { useState } from "react";
import Myblog from "./myblog";
import Register from "./register";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setform] = useState({email:'',password:''})
  const navigate=useNavigate()

  const handleChange=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const req=await axios.post('http://localhost:8000/api/login',form,{withCredentials:true})
      console.log(req.data.message+' '+req.data.token)
      if(req.status==200){
        navigate('/')
      }

    } catch (error) {
      console.log(error.response.message)
      if(error.response.status==400){
        navigate('/register')
      }
    }
    

  }


  return (
    <div className="px-5 py-5 ">

      <header className="flex text-2xl justify-around underline mb-20">
        <Link to="/">My Blog</Link>
        <Link to="/register">Register</Link>
        <Link to='/createpost'>Create Post</Link>
      </header>
      <div className="w-screen text-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-15 text-3xl">
            <strong>Login</strong>
          </h1>
          <div className=" w-full mb-6 space-x-10">
            <input
              type="text"
              placeholder="Username"
              className="text-center border-2 border-black rounded-2xl bg-[#eee]"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="text-center border-2 border-black rounded-2xl bg-[#eee]"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="border-2 border-black rounded-2xl px-10 cursor-pointer bg-[#eee]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
