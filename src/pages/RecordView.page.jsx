import { useGlobal, useState, useEffect } from "reactn";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Record from "../components/Record/Record";
import NewRecordForm from "../components/Record/NewRecordForm";
import ShareRecordButton from "../components/Record/ShareRecordButton";

const RecordView = () => {

  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");
  const [activeRecord, setActiveRecord] = useGlobal("activeRecord");

  const [otherRecords, setOtherRecords] = useState(null);
  const [chartRecords, setChartRecords] = useState([activeRecord]);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const getOtherRecords = async () => {
    try {
      await axios.get("https://listy-the-server.herokuapp.com/record/", {
        headers: {
          "Authorization": `Bearer ${token}`
      }}).then(response => setOtherRecords(response.data.filter(record => record._id != activeRecord._id)));
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getOtherRecords();
  }, []);

  const handleExit = async () => {
    try {
      await axios.patch(`https://listy-the-server.herokuapp.com/record/${activeRecord._id}`, {activeRecord}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }})
      .then(setActiveRecord(null));
    } catch (error) {
      console.log(error);
    };
  };

  const handleDelete = async () => {
    await axios.delete(`https://listy-the-server.herokuapp.com/record/${activeRecord._id}`).then(setActiveRecord(null));
  };

  const handleOverlayClick = () => {
    setOverlayOpen(true);
    document.getElementById("overlay").focus();
  };

  const handleOverlayBlur = () => {
    setOverlayOpen(false);
  };

  const handleOverlaySelect = (e) => {
    let overlayChart = otherRecords[e.target.id];
    if (chartRecords.includes(overlayChart)) {
      setChartRecords(chartRecords.filter(record => record._id != overlayChart._id))
    } else {
      setChartRecords([...chartRecords, overlayChart]);
    }
    setOverlayOpen(false);
  };

  return (
    <div className="page">
      <button onClick={handleExit} className="exitRecordButton">home</button>
      { activeRecord == "new" && <NewRecordForm /> }
      { activeRecord && activeRecord != "new" && 
      <Record chartRecords={chartRecords}/> }
      { !token && <Navigate replace to="/"/> }
      { !activeRecord && <Navigate replace to="/home" /> }
      <div id="overlay" onBlur={handleOverlayBlur} tabIndex="-1">
        { overlayOpen ?
          <div id="overlayOptions">
            { otherRecords.map((record, index) =>
              <p onClick={handleOverlaySelect} id={index} key={index}>{record.name}</p>
            ) }
          </div>
          :
          <div onClick={handleOverlayClick} id="overlayButton">graph</div>
        }
      </div>
      <ShareRecordButton />
      <button onClick={handleDelete} className="deleteRecordButton">delete</button>
    </div>
  )
};

export default RecordView;
