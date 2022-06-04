import { useState, useGlobal, useEffect } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

import NewListButton from "./NewListButton";

const ListBubble = () => {

  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");
  const [activeList, setActiveList] = useGlobal("activeList");

  const [lists, setLists] = useState(null);

  const handleListClick = (e) => {
    setActiveList(lists[e.target.id])
  };

  const getLists = async () => {
    const userLists = await axios.get(`http://localhost:3001/list/`, {user: user._id}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {setLists(response.data)});
  };

  useEffect(() => {
    getLists();
  }, []);

  const logButton = () => {
    console.log("lists" ,lists);
  }

  return (
    <div className="bubble">
      <button onClick={logButton} className="logButton">log</button>
      { activeList && <Navigate to={"/ListView"}/> }
      <div className="bubbleButtons">
        <h3>Lists</h3>
        <NewListButton />
      </div>
      <div className="bubbleItems">
        {lists?.map((list, index) => 
          <div
            id={index}
            key={list._id}
            onClick={(e) => handleListClick(e)}>
              {list.name}
            </div>
        )}
      </div>
    </div>
  )
}

export default ListBubble;
