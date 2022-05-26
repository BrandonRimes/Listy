import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {

  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");

  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:3001/auth/login", formState);

      setUser(data.user);
      setToken(data.token);
      setLoggedIn(true);

    } catch (er) {
      setError(er.response.data.errors);
      console.log("error:", er.response.data.errors);
    }
  }

  return (
    <>
      {loggedIn && <Navigate replace to="/home" />}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={handleChange} value={formState.username}/>
        <input type="password" name="password" placeholder="password" onChange={handleChange} value={formState.password}/>
        <button>Log In</button>
        <Link to="/signup">no account? signup!</Link>
      </form>
    </>
  );
}

export default LoginForm;
