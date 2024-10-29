import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartPage({title, chartData = []}) {
  const data = {
    labels: ["達成", "未達成"],
    datasets: [
      {
        label: title,
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div>
        <Pie
          data={data}
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </div>
    </>
  );
}