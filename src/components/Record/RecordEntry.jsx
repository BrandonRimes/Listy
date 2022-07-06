import { useGlobal } from "reactn";
import axios from "axios";

const RecordEntry = (props) => {

  const [activeRecord, setActiveRecord] = useGlobal("activeRecord");

  const handleDelete = async () => {
    await axios.delete(`https://listy-the-server.herokuapp.com/recordEntry/${props.entry._id}`);
    const newEntryList = activeRecord.recordEntries.filter(entry => entry._id != props.entry._id);
    setActiveRecord({
      ...activeRecord,
      recordEntries: newEntryList
    });
  };

  return (
    <div className="recordEntry">
      <div className="recordEntryText">
        <h5>{props.entry.measure} @ {props.entry.time} on {props.entry.date}</h5>
        <p>{props.entry.info}</p>
      </div>
      <button onClick={handleDelete} className="recordEntryDeleteButton">x</button>
    </div>
  );

};

export default RecordEntry;
