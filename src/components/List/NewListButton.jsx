import { useGlobal } from "reactn";
import axios from "axios";

const NewListButton = () => {

  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");
  const [activeList, setActiveList] = useGlobal("activeList");
  

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://listy-the-server.herokuapp.com/list/", {name: "New List", user: user.username}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(response => setActiveList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>
        New
      </button>
    </>
  )
};

export default NewListButton;
