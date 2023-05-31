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
import { Typography } from "antd";

const LineChart = ({ coinHistory, currentPrice, coinName, changeData }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory.length; i += 1) {
    coinPrice.push(coinHistory[i].close);
  }

  for (let i = 0; i < coinHistory.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory[i].timestamp).toLocaleDateString());
  }

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

  // const lastElement = coinHistory !== undefined ? coinHistory.length : "";
  // const priceChange =
  //   coinHistory !== undefined
  //     ? ((coinHistory[lastElement - 1].close - coinHistory[0].open) /
  //         coinHistory[0].open) *
  //       100
  //     : "";
  // console.log(coinHistory);

  return coinHistory !== undefined ? (
    <>
      <Typography.Title level={5} className="price-change">
        {changeData}
      </Typography.Title>
      <Typography.Title level={5} className="current-price">
        Current Price: $ {currentPrice}
      </Typography.Title>
      <Line data={data} options={options} />
    </>
  ) : (
    ""
  );
};

export default LineChart;
