
const Today = () => {

  const date = new Date();

  const format = (n) => {
    if (n < 10) {
      return `0${n}`
    } else {
      return n.toString();
    }
  };

  const year = date.getFullYear().toString();
  const month = format(date.getMonth()+1);
  const day = format(date.getDate());
  const hour = format(date.getHours());
  const minute = format(date.getMinutes());

  return { year, month, day, hour, minute }
};

export default Today;
