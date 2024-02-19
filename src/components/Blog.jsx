import { useEffect, useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog }) => {
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
        </div>
      )}
    </div>
  );
};
export default Blog;
