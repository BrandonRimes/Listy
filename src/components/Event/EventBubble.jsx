import { useState, useGlobal, useEffect } from "reactn";
import { Navigate } from "react-router-dom";
import axios from "axios";

import NewEventButton from "./NewEventButton";

const EventBubble = () => {

  const [token, setToken] = useGlobal("token");
  const [activeEvent, setActiveEvent] = useGlobal("activeEvent");

  const [events, setEvents] = useState(null);

  const getEvents = async () => {
    try {
      await axios.get("http://localhost:3001/event/", {
        headers: {
          "Authorization": `Bearer ${token}`
      }}).then(res =>
          setEvents(res.data.sort((a,b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())));
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleEventClick = (e) => {
    setActiveEvent(events[e.target.id])
  };

  return (
    <div className="bubble">
      { activeEvent && <Navigate to={"/EventView"}/> }
      <div className="bubbleButtons">
        <h3>Events</h3>
        <NewEventButton />
      </div>
      <div className="bubbleItems">
        {events?.map((event, index) => 
          <div
            id={index}
            key={event._id}
            onClick={(e) => handleEventClick(e)}>
              {event.name}
          </div>
        )}
      </div>
    </div>
  )
};

export default EventBubble;
