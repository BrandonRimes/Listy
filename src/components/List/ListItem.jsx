import { useState, useGlobal } from "reactn";
import axios from "axios";

const ListItem = (props) => {

  const [token, setToken] = useGlobal("token");
  const [activeList, setActiveList] = useGlobal("activeList");

  const [editItem, setEditItem] = useState(null);
  const [checked, setChecked] = useState(props.checked);

  const handleDelete = async () => {
    await axios.delete(`https://listy-the-server.herokuapp.com/listItem/${props.id}`);
    const newItemList = activeList.listItems.filter(item => item._id != props.id);
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
      await axios.patch(`https://listy-the-server.herokuapp.com/listItem/${props.id}`, {
        name: editItem.name,
        info: editItem.info
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
      }}).then(setEditItem(null));

      await axios.get(`https://listy-the-server.herokuapp.com/list/${activeList.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => setActiveList(res.data));

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

  const handleCheck = async (e) => {
    try {
      await setChecked(!checked);
      await axios.patch(`https://listy-the-server.herokuapp.com/listItem/${props.id}`, { checked: !checked });
      await axios.get(`https://listy-the-server.herokuapp.com/list/${activeList.id}`)
        .then(res => setActiveList({...activeList, ...res.data}));
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="listItem">
      { editItem ?
        <form id="editListItemForm"
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        >
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
        </form>
        :
        <>
          <input className="checkbox"
            name="checked"
            checked={checked}
            onChange={handleCheck}
            type="checkbox"
          />
          <div onClick={handleEdit} className="listItemText">
            <h4 id={props.id} className="listItemName">{props.name}</h4>
            <p id={props.id} className="listItemInfo">{props.info}</p>
          </div>
        </>
      }
      <button onClick={handleDelete} className="listItemDeleteButton">x</button>
    </div>
  );
};

export default ListItem;
