import { useState, useGlobal } from "reactn";
import { Navigate } from "react-router-dom";
import axios from "axios";

import ListItem from "./ListItem";
import NewListItemForm from "./NewListItemForm";
import ShareListButton from "./ShareListButton";

const List = () => {

  const [activeList, setActiveList] = useGlobal("activeList");
  const [token, setToken] = useGlobal("token");

  const [newName, setNewName] = useState(null);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/list/${activeList._id}`);
    setActiveList(null);
  };

  const handleNameClick = async () => {
    await setNewName(activeList.name);
    await document.getElementById("newNameInput").focus();
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:3001/list/${activeList._id}`, {name: newName})
      .then(setActiveList({...activeList, name: newName}))
      .then(setNewName(null));
    } catch (error) {
      console.log(error);
    };
  };

  const handleExit = async () => {
    try {
      await axios.patch(`http://localhost:3001/list/${activeList._id}`, {activeList}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }})
      .then(setActiveList(null));
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="list">
      <button onClick={handleExit} className="exitListButton">home</button>
      { activeList && <>
        { newName != null ?
          <form onSubmit={handleNameSubmit}>
            <input id="newNameInput"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleNameSubmit}
              type="text"
            />
          </form>
          :
          <h2 onClick={handleNameClick} className="listName">{activeList.name}</h2>
        }
        <NewListItemForm />
        <div className="listItems">
          {activeList.listItems?.map((item, index) => 
          <ListItem name={item.name} key={index} id={item._id} title={index} info={item.info} checked={item.checked}/>
          )}
        </div>
        <button onClick={handleDelete} className="deleteListButton">delete</button>
        <ShareListButton />
      </> }
      { !activeList && <Navigate replace to="/home"/> }
    </div>
  )
};

export default List;
