import { useState } from "react";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title} </span>
        <button onClick={() => setView(!view)}>{view? "hide":"view"}</button>
      </div>
      {view && (
        <div>
          <div>{blog.url}</div>
          <div>
            <span>Likes {blog.likes} </span>
            <button>Like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};
export default Blog;
