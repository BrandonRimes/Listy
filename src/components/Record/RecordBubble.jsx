import { useState, useGlobal, useEffect } from "reactn";
import { Navigate } from "react-router-dom";
import axios from "axios";

const RecordBubble = () => {

  const [token, setToken] = useGlobal("token");
  const [activeRecord, setActiveRecord] = useGlobal("activeRecord");

  const [records, setRecords] = useState(null);

  const getRecords = async () => {
    try {
      await axios.get("http://localhost:3001/record/", {
        headers: {
          "Authorization": `Bearer ${token}`
      }}).then(response => setRecords(response.data.sort((a,b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const handleNewClick = () => {
    setActiveRecord("new");
  };

  const handleRecordClick = (e) => {
    setActiveRecord(records[e.target.id]);
  };

  return (
    <div className="bubble">
      { activeRecord && <Navigate to={"/RecordView"}/> }
      <div className="bubbleButtons">
        <h3>Records</h3>
        <button onClick={handleNewClick}>New</button>
      </div>
      <div className="bubbleItems">
        {records?.map((record, index) => 
          <div id={index}
            key={record._id}
            onClick={(e) => handleRecordClick(e)}>
              {record.name}
          </div>
        )}
      </div>
    </div>
  )
};

export default RecordBubble;
