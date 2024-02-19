import { useState, useEffect, useRef } from "react";
import "./App.css"
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({
    type:"",
    text:""
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      if (user) {
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        setUser(user);        
      }else{
        setMessage({
          text: "Wrong username or password",
          type: "error",
        });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 5000);
      }
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({
        text: "Wrong username or password",
        type: "error",
      });
      setTimeout(() => {
        setMessage({type:"",text:""});
      }, 5000);
    }
  };
  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };
  useEffect(() => {
    blogService.getAll().then((blogs) =>{
       const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
       setBlogs(sortedBlogs);
    });
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
  const addBlog = async (newBlog) => {

    blogService.setToken(user.token);
    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
    setMessage({
      text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type:"success",
    });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 5000);
    
  };

  const removeBlog = async(id)=>{
    await blogService.remove(id);
   setBlogs(() => blogs.filter((blog) => blog.id !== id));
  }

  return (
    <div>
      {message.text && <Notification message={message} />}
      {!user && loginForm()}

      {user && (
        <div>
          <h2>Blogs</h2>
          <p>
            <span>{user.name} logged in </span>
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable buttonLabel="new blog">
            <NewBlog addBlog={addBlog} />
          </Togglable>

          {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} removeBlog={removeBlog}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
