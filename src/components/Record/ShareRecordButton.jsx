import { useState, useGlobal } from "reactn";
import axios from "axios";

const ShareRecordButton = () => {

  const [activeRecord, setActiveRecord] = useGlobal("activeRecord");

  const [newRecordUser, setNewRecordUser] = useState(false);

  const handleClick = async () => {
    await setNewRecordUser("");
    await document.getElementById("newRecordUserInput")?.focus();
  };

  const handleChange = (e) => {
    setNewRecordUser(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`https://listy-the-server.herokuapp.com/record/${activeRecord._id}`, {users: [...activeRecord.users, newRecordUser]})
        .then(setActiveRecord({...activeRecord, users: [...activeRecord.users, newRecordUser]}))
        .then(setNewRecordUser(false));
    } catch (error) {
      console.log(error);
    };
  };

  const handleBlur = (e) => {
    const form = document.getElementById("shareRecordForm");
    if (!form.contains(e.relatedTarget)) {
      setNewRecordUser(false);
    };
  };

  return (
    <div className="shareRecord">
      { newRecordUser || newRecordUser === "" ?
        <form onSubmit={handleSubmit} id="shareRecordForm">
          <input id="newRecordUserInput"
            placeholder="username"
            value={newRecordUser}
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

export default ShareRecordButton;
