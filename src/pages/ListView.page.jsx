import { useGlobal } from "reactn";
import { Navigate } from "react-router-dom";

import List from "../components/List/List";

const ListView = () => {
  const [token, setToken] = useGlobal("token");

  return (
    <div className="page">
      { !token && <Navigate replace to="/login"/> }
      <List />
    </div>
  )
}

export default ListView;
