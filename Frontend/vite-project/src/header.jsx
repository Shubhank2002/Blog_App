import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Header = ({bool,setbool}) => {

  const handleLogout=async()=>{
    const res=await axios.get('http://localhost:8000/api/logout',{withCredentials:true})
    setbool(false)
  }
  return (
    <div>

      {!bool ? (
        <header className='m-5 flex justify-around text-2xl underline mb-20'>
          <div>
              <Link to='/login'>Login</Link>
              
          </div>
          <div>
            <Link to='/register'>Register</Link>
          </div>
        </header>
        
      ):(
        <header className='flex text-2xl m-5 underline justify-around mb-20'>
          <div>
            <Link to='/createpost'>Create post</Link>
          </div>
          <div>
            <Link to='/editpost'>Edit post</Link>
          </div>
          <div>
            <Link to='/myposts'>My post</Link>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>
      )}
    </div>
  )
}

export default Header
