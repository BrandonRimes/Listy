import { useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";

import ListBubble from "../components/ListBubble";
import RecordBubble from "../components/RecordBubble";
import EventBubble from "../components/EventBubble";

const Home = () => {
  const [token, setToken] = useGlobal("token");

  return (
    <div className="page homePage">
      { !token && <Navigate replace to="/"/> }
      <ListBubble />
      <RecordBubble />
      <EventBubble />
    </div>
  )
}

export default Home;
