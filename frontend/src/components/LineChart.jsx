import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const LineChart = ({ coinHistory, currentPrice, changeData }) => {
  // Check if coinHistory is defined and has a 'prices' property
  if (!coinHistory || !coinHistory.prices) {
    return null; // Return null or handle this case as needed
  }

  const coinPrice = coinHistory.prices.map((priceData) => priceData[1]);
  const coinTimestamp = coinHistory.prices.map((priceData) =>
    new Date(priceData[0]).toLocaleDateString()
  );

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#fc4c4c",
        borderColor: "#fc4c4c",
      },
    ],
  };

  const options = {
    scales: {
      xAxes: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },

      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return coinHistory ? (
    
    <Line data={data} options={options} />

  ) : (
    ""
  );
};

export default LineChart;
