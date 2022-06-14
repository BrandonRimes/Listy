import { useState, useGlobal } from "reactn";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Event = () => {

  const [activeEvent, setActiveEvent] = useGlobal("activeEvent");
  const [token, setToken] = useGlobal("token");

  const [fieldEditing, setFieldEditing] = useState("");

  const handleFieldClick = async (e) => {
    await setFieldEditing(e.target.id);
    await document.getElementById(e.target.id).focus();
    console.log(fieldEditing);
  };

  const handleChange = (e) => {
    setActiveEvent({
      ...activeEvent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.patch(`http://localhost:3001/event/${activeEvent._id}`, activeEvent, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(setFieldEditing(""));
    } catch (error) {
      console.log(error);
    };
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const form = document.getElementById(`${e.target.id}Form`);
    if (!form.contains(e.relatedTarget)) {
      handleSubmit(e);
    };
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/event/${activeEvent._id}`);
    setActiveEvent(null);
  };

  return (
    <div className="event">
      { fieldEditing != "eventName" && activeEvent.name ?
        <h2 onClick={handleFieldClick} id="eventName">
          {activeEvent.name}
        </h2>
        :
        <form id="eventNameForm"
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        >
          <input
            name="name"
            value={activeEvent.name}
            placeholder="event name"
            onChange={handleChange}
            type="text"
            id="eventName"
          />
        </form>
      }
      <form id="eventDatetimeForm"
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <input
          name="datetime"
          value={activeEvent.datetime}
          placeholder="datetime"
          onChange={handleChange}
          type="datetime-local"
          id="eventDatetime"
        />
      </form>
      { fieldEditing != "eventInfo" && activeEvent.info ?
        <p onClick={handleFieldClick} id="eventInfo">
          {activeEvent.info}
        </p>
        :
        <form id="eventInfoForm"
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        >
          <input
            name="info"
            value={activeEvent.info}
            placeholder="info"
            onChange={handleChange}
            type="text"
            id="eventInfo"
          />
        </form>
      }
      { fieldEditing != "eventDuration" && activeEvent.duration ?
        <p onClick={handleFieldClick} id="eventDuration">
          {activeEvent.duration}
        </p>
        :
        <form id="eventDurationForm"
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        >
          <input
            name="duration"
            value={activeEvent.duration}
            placeholder="duration"
            onChange={handleChange}
            type="text"
            id="eventDuration"
          />
        </form>
      }
      <button onClick={handleDelete} className="deleteEventButton">delete</button>
    </div>
  );
};

export default Event;
