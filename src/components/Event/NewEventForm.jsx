import { useState, useGlobal } from "reactn";
import axios from "axios";

const NewEventForm = () => {

  const [activeEvent, setActiveEvent] = useGlobal("activeEvent");
  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");

  const formData = {
    name: "",
    datetime: "",
    info: "",
    duration: ""
  }

  const [newEvent, setNewEvent] = useState(formData);
  const [fieldEditing, setFieldEditing] = useState("");

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/event/`, newEvent, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => setActiveEvent(res.data))
        .then(setNewEvent(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newEventForm">
      <input
        name="name"
        value={newEvent.name}
        placeholder="event name"
        onChange={handleChange}
        type="text"
      />
      <input
        name="datetime"
        value={newEvent.datetime}
        placeholder="datetime"
        onChange={handleChange}
        type="datetime-local"
      />
      <input
        name="info"
        value={newEvent.info}
        placeholder="event info"
        onChange={handleChange}
        type="text"
      />
      <input
        name="duration"
        value={newEvent.duration}
        placeholder="duration"
        onChange={handleChange}
        type="text"
      />
      <button type="submit" className="newEventButton">+</button>
    </form>
  );
};

export default NewEventForm;
