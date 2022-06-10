import { useState } from "reactn";

const Settings = () => {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div id="settings">
      <button onClick={handleClick}>#</button>
      { open && 
        <form className="settings">
          <label htmlFor="bg">background</label>
          <input name="bg" type="color"/>
          <label htmlFor="btns">buttons</label>
          <input name="btns" type="color"/>
          <label htmlFor="bbls">bubbles</label>
          <input name="bbls" type="color"/>
          <label htmlFor="inpt">inputs</label>
          <input name="inpt" type="color"/>
        </form>
      }
    </div>
  )
}

export default Settings