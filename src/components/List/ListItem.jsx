import { useState, useGlobal } from "reactn";
import axios from "axios";

const ListItem = (props) => {

  const [token, setToken] = useGlobal("token");
  const [activeList, setActiveList] = useGlobal("activeList");

  const [editItem, setEditItem] = useState(null);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/listItem/${props.id}`);
    const newItemList = activeList.listItems.filter(item => item._id != props.id)
    setActiveList({
      ...activeList,
      listItems: newItemList
    })
  };

  const handleChange = (e) => {
    setEditItem({...editItem, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:3001/listItem/${props.id}`, {
        name: editItem.name,
        info: editItem.info
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
      }}).then(setEditItem(null));

      await axios.get(`http://localhost:3001/list/${activeList.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(response => setActiveList(response.data));

    } catch (error) {
      console.log(error);
    };
  };

  const handleEdit = async (e) => {
    try {
      await setEditItem({ name: props.name, info: props.info, id: props.id });
      await document.getElementById(e.target.className)?.focus();
    } catch (error) {
      console.log(error);
    };
  };

  const handleBlur = async (e) => {
    const form = document.getElementById("editListItemForm");
    if (!form.contains(e.relatedTarget)) {
      handleSubmit(e);
    };
  };

  return (
    <div className="listItem">
      { editItem ? <form onSubmit={handleSubmit} onBlur={handleBlur} id="editListItemForm">
          <input
            name="name"
            value={editItem.name}
            placeholder="name"
            onChange={handleChange}
            type="text"
            id="listItemName"
            className="listItemName"
          />
          <input
            name="info"
            value={editItem.info}
            placeholder="info"
            onChange={handleChange}
            type="text"
            id="listItemInfo"
            className="listItemInfo"
          />
          <button className="editListItemButton"></button>
        </form> :
        <div onClick={handleEdit} className="listItemText">
          <h4 id={props.id} className="listItemName">{props.name}</h4>
          <p id={props.id} className="listItemInfo">{props.info}</p>
        </div>
      }
      <button onClick={handleDelete} className="listItemDeleteButton">x</button>
    </div>
  );
};

export default ListItem;
