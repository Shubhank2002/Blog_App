import React from "react";
import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, content,_id }) => {
  return (
    <div>
      <div className="entry mx-16 ">
        <div className="post flex gap-9 mb-10">
          <div className="w-[30%]">
            <Link to={`/post/${_id}`}>
              <img src={"http://localhost:8000/" + cover} alt="" className="w-full"/>
            </Link>
          </div>
          <div className="text">
            <Link to={`/post/${_id}`}>
              <h2 className="text-2xl mb-10">
                <strong>{title}</strong>
              </h2>
            </Link>

            <p>{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
