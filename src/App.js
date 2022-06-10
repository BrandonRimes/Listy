import { setGlobal, addCallback } from "reactn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Signup from "./pages/Signup.page";
import Login from "./pages/Login.page";
import Home from "./pages/Home.page";
import ListView from "./pages/ListView.page";
import RecordView from "./pages/RecordView.page";
import EventView from "./pages/EventView.page";

function App() {

  const rehydrateState = () => {
    const state = localStorage.getItem("globalState");
    if (state) return JSON.parse(state);

    return {
      token: null,
      user: null,
      activeList: null,
      activeRecord: null,
      activeEvent: null
    };
  }

  setGlobal(rehydrateState());

  addCallback(state => {
    localStorage.setItem("globalState", JSON.stringify(state))
  });

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/ListView" element={<ListView />}/>
        <Route path="/RecordView" element={<RecordView />}/>
        <Route path="/EventView" element={<EventView />}/>
        <Route path="*" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
