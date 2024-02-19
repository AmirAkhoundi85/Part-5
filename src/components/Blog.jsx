import { useEffect, useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, removeBlog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likePost = async () => {
    await blogService.update(blog.id, { ...blog, likes: likes + 1 });
    setLikes(likes + 1);
  };

  const removeHandle= async()=>{
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        removeBlog(blog.id);
    }
  } 
  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title} </span>
        <button onClick={() => setView(!view)}>{view ? "hide" : "view"}</button>
      </div>
      {view && (
        <div>
          <div>{blog.url}</div>
          <div>
            <span>Likes {likes} </span>
            <button onClick={likePost}>Like</button>
          </div>
          <div>{blog.author}</div>
          <button onClick={removeHandle}>remove</button>
        </div>
      )}
    </div>
  );
};
export default Blog;
