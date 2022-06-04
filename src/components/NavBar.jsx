import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const [user, setUser] = useGlobal("user");

  return (
    <nav>
      <Link to="/home"><div id="logo">Listy</div></Link>
      <div id="auth">
        { !user && <>
          <Link to="/login"><div className="auth">log in</div></Link>
          <Link to="/signup"><div className="auth">sign up</div></Link>
        </> }
        { user && <LogoutButton to="/">log out</LogoutButton> }
      </div>
    </nav>
  );
};

export default NavBar;
