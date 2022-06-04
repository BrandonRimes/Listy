import { useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";

import List from "../components/List";

const ListView = () => {
  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");
  const [activeList, setActiveList] = useGlobal("activeList");

  return (
    <div className="page">
      { !token && <Navigate replace to="/"/> }
      <List />
    </div>
  )
}

export default ListView;
