import { useState, useGlobal } from "reactn";
import axios from "axios";

import ChartBox from "./ChartBox";
import RecordEntry from "./RecordEntry";
import NewRecordEntryForm from "./NewRecordEntryForm";
import Today from "./Today";
const { year, month, day, hour, minute } = Today();

const Record = ({chartRecords}) => {

  const [activeRecord, setActiveRecord] = useGlobal("activeRecord");
  const [token, setToken] = useGlobal("token");

  const [newName, setNewName] = useState(null);

  activeRecord.recordEntries?.sort((a, b) => new Date(b.date) - new Date(a.date));

  const dailyTotal = () => {
    let total = 0;
    let today = `${year}-${month}-${day}`
    activeRecord.recordEntries?.forEach(entry => {
      if (entry.date == today) total += parseFloat(entry.measure);
    });

    return total;
  };

  const handleNameClick = async () => {
    await setNewName(activeRecord.name);
    await document.getElementById("newNameInput").focus();
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`https://listy-the-server.herokuapp.com/record/${activeRecord._id}`, {name: newName})
      .then(setActiveRecord({...activeRecord, name: newName}))
      .then(setNewName(null));
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="record">
      { activeRecord && <>
        { newName != null ?
          <form onSubmit={handleNameSubmit}>
            <input id="newNameInput"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleNameSubmit}
              type="text"
            />
          </form>
          :
          <h2 onClick={handleNameClick} className="recordName">{activeRecord.name}</h2>
        }
        <h3>{dailyTotal()} {activeRecord.units} today</h3>
        <NewRecordEntryForm />
        <div className="chartboxbox">
          <ChartBox records={chartRecords}/>
        </div>
        <div className="recordEntries">
          {activeRecord.recordEntries?.map((entry, index) => 
          <RecordEntry entry={entry} key={index}/>
          )}
        </div>
      </> }
    </div>
  )
};

export default Record;
