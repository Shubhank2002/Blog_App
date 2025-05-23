import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate=useNavigate()
    const [form, setform] = useState({email:'',password:''})

    const handleChange=(e)=>{
      setform({...form,[e.target.name]:e.target.value})
    }
    
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try {
        const res=await axios.post('http://localhost:8000/api/register',form,{withCredentials:true})
        console.log(res.data.message+' '+res.data.hashpassword)
        if(res.status==200){
          navigate('/login')
        }
      } catch (error) {
        if(error.response.status==401){
    
          navigate('/login')
        }
      }
    }

  return (
    <div className="py-5">
      <header className="text-2xl flex justify-around underline mb-20">
        <Link to="/">My Blog</Link>
        <Link to="/login">Login</Link>
      </header>
      <div className="w-screen flex  justify-center">
        <form className="" onSubmit={handleSubmit}>
          <h1 className="text-center mb-15 text-3xl">
            <strong>Register</strong>
          </h1>
          <div className="  mb-6 flex flex-col gap-8 justify-center">
            <input
              type="text"
              placeholder="email"
              className="text-center border-2 border-black rounded-2xl bg-[#eee] "
              onChange={handleChange}
              name="email"
              value={form.email}
            />
            <input
              type="password"
              placeholder="password"
              className="text-center border-2 border-black rounded-2xl w-[352.64px] bg-[#eee]"
              onChange={handleChange}
              name="password"
              value={form.password}
            />
          </div>
          <div className="text-center w-[352.64px]">
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

export default Register;
