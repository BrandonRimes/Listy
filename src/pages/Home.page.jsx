import { useGlobal } from "reactn";

const Home = () => {
  const [token, setToken] = useGlobal("token");

  return (
    <div className="page">
      <h1>Home</h1>
    </div>
  )
}

export default Home;
