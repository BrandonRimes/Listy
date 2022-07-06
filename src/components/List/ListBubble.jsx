import { useState, useGlobal, useEffect } from "reactn";
import { Navigate } from "react-router-dom";
import axios from "axios";

import NewListButton from "./NewListButton";

const ListBubble = () => {

  const [token, setToken] = useGlobal("token");
  const [activeList, setActiveList] = useGlobal("activeList");

  const [lists, setLists] = useState(null);

  const handleListClick = (e) => {
    setActiveList(lists[e.target.id])
  };

  const getLists = async () => {
    try {
      await axios.get("https://listy-the-server.herokuapp.com/list/", {
        headers: {
          "Authorization": `Bearer ${token}`
      }}).then(response =>
          setLists(response.data.sort((a,b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())));
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div className="bubble">
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
};

export default ListBubble;
