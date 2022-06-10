
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartBox = ({records}) => {

  const dailyTotals = (record) => {
    let dates = [];
    let totals = [];
    let total = 0;
    let first = true;
    const recordLength = record.recordEntries?.length;
    
    record.recordEntries?.sort((a, b) => new Date(a.date) - new Date(b.date));

    record.recordEntries?.forEach((entry, index) => {
      if (!dates.includes(entry.date)) {
        dates.push(entry.date);
        if (!first) {
          totals.push(total);
          total = 0;
        };
        total += parseInt(entry.measure);
        if (index + 1 == recordLength) totals.push(total);
      } else if (dates.includes(entry.date)) {
        total += parseInt(entry.measure);
        if (index + 1 == recordLength) totals.push(total);
      };
      first = false;
    });

    return {dates, totals}
  };


  const labels = dailyTotals(records[0]).dates.map(date => date.slice(5));

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  const data = {
    labels,
    datasets: records.map(record => {
      return {
        label: record.units + " " + record.variable,
        data: dailyTotals(record).totals
      };
    })
  };

  return (
    <div className="chartbox">
      <Line options={options} data={data}/>
    </div>
  );
};

export default ChartBox;
