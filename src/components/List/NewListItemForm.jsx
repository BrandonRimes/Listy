import { useState, useGlobal } from "reactn";
import axios from "axios";

const NewListItemForm = () => {

  const [activeList, setActiveList] = useGlobal("activeList");
  const [token, setToken] = useGlobal("token");

  const [newItem, setNewItem] = useState({
    name: "",
    info: "",
    list: activeList.id
  });

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://listy-the-server.herokuapp.com/listItem/`, {...newItem}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(setNewItem({ name: "", info: "", list: activeList.id }));
      
      await axios.get(`https://listy-the-server.herokuapp.com/list/${activeList.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(response => setActiveList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="newListItemForm">
      <div className="newListItemInputs">
        <input
          name="name"
          value={newItem.name}
          placeholder="item name"
          onChange={handleChange}
          type="text"
        />
        <input
          name="info"
          value={newItem.info}
          placeholder="item info"
          onChange={handleChange}
          type="text"
        />
      </div>
      <button type="submit" className="newListItemButton">+</button>
    </form>
  );
};

export default NewListItemForm;
