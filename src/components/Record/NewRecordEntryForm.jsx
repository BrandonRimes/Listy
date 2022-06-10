import { useState, useGlobal } from "reactn";
import axios from "axios";

import Today from "./Today";
const { year, month, day, hour, minute } = Today();

const NewRecordEntryForm = () => {

  const [activeRecord, setActiveRecord] = useGlobal("activeRecord");

  const emptyForm = {
    measure: "",
    info: "",
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`,
    record: activeRecord._id
  };

  const [newEntry, setNewEntry] = useState(emptyForm);

  const handleChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/recordEntry/", newEntry).then(setNewEntry(emptyForm));

      await axios.get(`http://localhost:3001/record/${activeRecord._id}`)
        .then(res => setActiveRecord(res.data));
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <>
    <form onSubmit={(e) => handleSubmit(e)} className="newRecordEntryForm">
      <div className="newRecordEntryInputs">
        <input
          name="measure"
          value={newEntry.measure}
          placeholder={activeRecord.units + " of " + activeRecord.variable}
          onChange={handleChange}
          type="text"
        />
        <input
          name="info"
          value={newEntry.info}
          placeholder="info"
          onChange={handleChange}
          type="text"
        />
        <input
          name="date"
          value={newEntry.date}
          placeholder="date"
          onChange={handleChange}
          type="date"
        />
        <input
          name="time"
          value={newEntry.time}
          placeholder="time"
          onChange={handleChange}
          type="time"
        />
      </div>
      <button className="newRecordEntryButton">+</button>
    </form>
    </>
  );
};

export default NewRecordEntryForm;
