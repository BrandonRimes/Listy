import { useState, useGlobal } from "reactn";
import axios from "axios";

const NewRecordForm = () => {

  const [activeRecord, setActiveRecord] = useGlobal("activeRecord");
  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user");

  const [newRecord, setNewRecord] = useState({
    name: "",
    units: "",
    variable: "",
    users: [user.username]
  });

  const handleChange = (e) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/record/`, newRecord, {
        headers: {
          "Authorization": `Bearer ${token}`
        }})
        .then(res => setActiveRecord(res.data))
        .then(setNewRecord({
          name: "",
          units: "",
          variable: "",
          users: [user._id]
        }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="newRecordForm">
      <h3>create a record</h3>
      <input
        name="name"
        value={newRecord.name}
        placeholder="record name"
        onChange={handleChange}
        type="text"
      />
      <p>what variable are you recording?</p>
      <input
        name="variable"
        value={newRecord.variable}
        placeholder="ex: sleep, milk, exercise"
        onChange={handleChange}
        type="text"
      />
      <p>what units is the variable measured in?</p>
      <input
        name="units"
        value={newRecord.units}
        placeholder="ex: hr, oz, min"
        onChange={handleChange}
        type="text"
      />
      <button>+</button>
    </form>
  );
};

export default NewRecordForm;
