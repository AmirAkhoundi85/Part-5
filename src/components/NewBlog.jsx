import React, { useState } from "react";

const NewBlog = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    newBlog.likes=0;
    addBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="title">Author:</label>
          <input
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="title">Url:</label>
          <input
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default NewBlog;
