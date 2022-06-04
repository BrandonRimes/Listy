import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const NewListButton = () => {

  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");
  const [activeList, setActiveList] = useGlobal("activeList");
  

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/list/", {name: "New List", user: user._id}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(response => setActiveList(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        New
      </button>
    </>
  )
};

export default NewListButton;
