import { useGlobal } from "reactn";
import { Navigate } from "react-router-dom";

import Event from "../components/Event/Event";
import NewEventForm from "../components/Event/NewEventForm";

const EventView = () => {

  const [token, setToken] = useGlobal("token");
  const [activeEvent, setActiveEvent] = useGlobal("activeEvent");

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
    <div className="page">
      <button onClick={handleExit} className="exitEventButton">home</button>
      { activeEvent && <>
        <Event />
      </> }
      { !activeEvent && <Navigate replace to="/home"/> }
      { !token && <Navigate replace to="/"/> }
    </div>
  )
};

export default EventView;
