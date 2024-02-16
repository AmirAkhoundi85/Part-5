import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // blogService.setToken(user.token);
    }
  }, []);
  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
  const addBlog = async (event) => {
    event.preventDefault();
    blogService.setToken(user.token);
    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };
  const blogForm = () => (
    <>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
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

  return (
    <div>
      {!user && loginForm()}

      {user && (
        <div>
          <h2>Blogs</h2>
          <p>
            <span>{user.name} logged in </span>
            <button onClick={handleLogout}>Log out</button>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
