import { useState, useGlobal } from "reactn";
import { Navigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Event from "../components/Event/Event";
import ShareEventButton from "../components/Event/ShareEventButton";

const EventView = () => {

  const [token, setToken] = useGlobal("token");
  const [activeEvent, setActiveEvent] = useGlobal("activeEvent");

  const [calVal, setCalVal] = useState(new Date());

  const handleExit = async () => {
    try {
      // await axios.patch(`http://localhost:3001/event/${activeEvent._id}`, {activeEvent}, {
      //   headers: {
      //     "Authorization": `Bearer ${token}`
      //   }})
      // .then(setActiveEvent(null));
      setActiveEvent(null);
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="page" id="eventPage">
      <button onClick={handleExit} className="exitEventButton">home</button>
      { activeEvent && <>
        <Event />
      </> }
      <Calendar />
      <ShareEventButton />
      { !activeEvent && <Navigate replace to="/home"/> }
      { !token && <Navigate replace to="/"/> }
    </div>
  )
};

export default EventView;
