import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";

const LogoutButton = (props) => {
  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal('user');

  const handleClick = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <>
      { !user && <Navigate replace to={props.to || "/"}/> }
      <div onClick={handleClick} className="auth">log out</div>
    </>
  );
};

export default LogoutButton;
