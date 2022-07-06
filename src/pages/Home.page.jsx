import { useGlobal } from "reactn";
import { Navigate } from "react-router-dom";

import ListBubble from "../components/List/ListBubble";
import RecordBubble from "../components/Record/RecordBubble";
import EventBubble from "../components/Event/EventBubble";
import Settings from "../components/Settings";

const Home = () => {
  const [token, setToken] = useGlobal("token");

  return (
    <div className="page homePage">
      { !token && <Navigate replace to="/login"/> }
      {/* <Settings /> */}
      <ListBubble />
      <RecordBubble />
      <EventBubble />
    </div>
  )
};

export default Home;
