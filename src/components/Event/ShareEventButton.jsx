import { useState, useGlobal } from "reactn";
import axios from "axios";

const ShareEventButton = () => {
  const [activeEvent, setActiveEvent] = useGlobal("activeEvent");

  const [newEventUser, setNewEventUser] = useState(false);

  const handleClick = async () => {
    await setNewEventUser("");
    await document.getElementById("newEventUserInput")?.focus();
  };

  const handleChange = (e) => {
    setNewEventUser(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`https://listy-the-server.herokuapp.com/event/${activeEvent._id}`, {users: [...activeEvent.users, newEventUser]})
        .then(response => setActiveEvent({...activeEvent, users: [...activeEvent.users, newEventUser]}))
        .then(setNewEventUser(false));
    } catch (error) {
      console.log(error);
    };
  };

  const handleBlur = (e) => {
    const form = document.getElementById("shareEventForm");
    if (!form.contains(e.relatedTarget)) {
      setNewEventUser(false);
    };
  };

  return (
    <div className="shareEvent">
      { newEventUser || newEventUser === "" ?
        <form onSubmit={handleSubmit} id="shareEventForm">
          <input id="newEventUserInput"
            placeholder="username"
            value={newEventUser}
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

export default ShareEventButton;
