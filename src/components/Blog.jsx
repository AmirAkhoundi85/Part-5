import { useState } from "react";

const Blog = ({ blog, name }) => {
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
      {view ? (
        <div>
          <div>
            <span>
              {blog.title} {blog.author}
            </span>
            <button onClick={() => setView(!view)}>
              {view ? "hide" : "view"}
            </button>
          </div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            <span className="likes">Likes {blog.likes} </span>
            <button>Like</button>
          </div>
          <div>{name}</div>
        </div>
      ) : (
        <div>
          <span>{blog.title} </span>
          <button onClick={() => setView(!view)}>
            {view ? "hide" : "view"}
          </button>
        </div>
      )}
    </div>
  );
};
export default Blog;
