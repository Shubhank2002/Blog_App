import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./post";
import Header from "./header";
import Login from "./pages/login";
import Register from "./pages/register";
import Myblog from "./pages/myblog";
import Createpost from "./pages/createpost";
import Mypost from "./pages/mypost";
import PagePost from "./pages/pagepost";
import Editpost from "./pages/editpost";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            index
            element={
              <Myblog/>
            }
          />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/createpost" element={<Createpost/>} />
          <Route path="/myposts" element={<Mypost/>}/>
          <Route path="/post/:id" element={<PagePost/>}/>
          <Route path="/editpost/:id" element={<Editpost/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
