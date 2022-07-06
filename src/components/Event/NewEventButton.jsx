import { useGlobal } from "reactn";
import axios from "axios";

const NewEventButton = () => {

  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");
  const [activeEvent, setActiveEvent] = useGlobal("activeEvent");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://listy-the-server.herokuapp.com/event/", {name: "New Event", user: user.username, datetime: "", info: "", duration: ""}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => setActiveEvent(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick}>
      New
    </button>
  )
};

export default NewEventButton;
