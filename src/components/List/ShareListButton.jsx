import { useState, useGlobal } from "reactn";
import axios from "axios";

const ShareListButton = () => {

  const [activeList, setActiveList] = useGlobal("activeList");

  const [newListUser, setNewListUser] = useState(false);

  const handleClick = async () => {
    await setNewListUser("");
    await document.getElementById("newListUserInput")?.focus();
  };

  const handleChange = (e) => {
    setNewListUser(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`https://listy-the-server.herokuapp.com/list/${activeList._id}`, {users: [...activeList.users, newListUser]})
        .then(response => setActiveList({...activeList, users: [...activeList.users, newListUser]}))
        .then(setNewListUser(false));
    } catch (error) {
      console.log(error);
    };
  };

  const handleBlur = (e) => {
    const form = document.getElementById("shareListForm");
    if (!form.contains(e.relatedTarget)) {
      setNewListUser(false);
    };
  };

  return (
    <div className="shareList">
      { newListUser || newListUser === "" ?
        <form onSubmit={handleSubmit} id="shareListForm">
          <input id="newListUserInput"
            placeholder="username"
            value={newListUser}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
          />
          <button>+</button>
        </form>
        :
        <button onClick={handleClick}>share</button>
      }
    </div>
  )
};

export default ShareListButton;
