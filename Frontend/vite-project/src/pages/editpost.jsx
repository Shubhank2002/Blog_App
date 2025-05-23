import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Editpost = () => {
  const [form, setform] = useState({ file: null, title: "", summary: "" });
  const [content, setcontent] = useState("");
  const { id } = useParams();
  const navigate=useNavigate()
  useEffect(() => {
    const res = axios.get(`http://localhost:8000/api/post/${id}`,{withCredentials:true})
    .then(res=>{setform(res.data.postdoc),setcontent(res.data.postdoc.content)});
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
  ];
  const handleUpload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", form.file);
    formdata.append("title", form.title);
    formdata.append("summary", form.summary);
    formdata.append("id", id);

    const res = axios
      .post("http://localhost:8000/api/editpost", formdata, {
        withCredentials: true,
      }).then(res=>{if(res.status===200){
        navigate(`/post/${id}`)
      }})
      
  };
  return (
    <div>
      <header className="flex my-5 justify-around text-2xl">
        <Link to="/">My Blog</Link>
        <Link to="/createpost">Create Post</Link>
      </header>
      <div>
        <div>
          <header className="w-[30%] mx-auto text-center text-3xl font-bold mt-5">
            Edit-Post
          </header>
          <form onSubmit={handleUpload} className="flex flex-col ">
            <input
              type="text"
              className="text-center mb-5 mt-10 border-t-2"
              placeholder="title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              type="text"
              className="text-center mb-5"
              placeholder="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
            />
            <input
              type="file"
              className="mb-5"
              onChange={(e) => setform({ ...form, file: e.target.files[0] })}
            />
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(e) => setContent(e)}
              modules={modules}
              formats={formats}
            />
            <button
              type="submit"
              className="cursor-pointer mt-5 bg-green-400 w-[50%] mx-auto rounded-2xl "
            >
              upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editpost;
