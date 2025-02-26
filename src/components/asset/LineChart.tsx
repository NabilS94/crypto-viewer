import { AssetHistoryDuration } from "@/typings/models";
import { formatValue } from "@/utils/business";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface LineChartProps {
  chartData: { priceUsd: string; time: number }[];
  chartLabel: string;
  duration: AssetHistoryDuration;
}

const trendStyle = {
  stable: {
    borderColor: "#a0aec0",
    gradient: { in: "rgba(0,0,0,0.3)", out: "rgba(0,0,0,0)" },
  },
  asc: {
    borderColor: "#51ebad",
    gradient: { in: "rgba(81,235,173,0.3)", out: "rgba(81,235,173,0.1)" },
  },
  desc: {
    borderColor: "#ef4537",
    gradient: { in: "rgba(239,69,55,0.3)", out: "rgba(239,69,55,0.1)" },
  },
};

const LineChart = ({ chartData, chartLabel, duration }: LineChartProps) => {
  const trend =
    chartData[chartData.length - 1].priceUsd > chartData[0].priceUsd
      ? "asc"
      : chartData[chartData.length - 1].priceUsd < chartData[0].priceUsd
      ? "desc"
      : "stable";

  const data = useMemo(() => {
    let gradient: CanvasGradient | undefined;
    try {
      const ctx = document.createElement("canvas").getContext("2d");
      gradient = ctx?.createLinearGradient(0, 0, 0, 400);
      gradient?.addColorStop(0, trendStyle[trend].gradient.in);
      gradient?.addColorStop(1, trendStyle[trend].gradient.out);
    } catch (err) {
      console.log(err);
    }

    return {
      labels: chartData.map(
        (entry) =>
          /* new Date(entry.time).toLocaleString([], {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })*/
          entry.time
      ),
      datasets: [
        {
          label: chartLabel,
          fill: true,
          data: chartData.map((entry) => parseFloat(entry.priceUsd)),
          borderColor: trendStyle[trend].borderColor,
          backgroundColor: gradient ?? "rgba(0,0,0,0.1)",
          pointRadius: 0,
        },
      ],
    };
  }, [chartData, trend, chartLabel]);

  // Line chart options
  const options: ChartOptions<"line"> = useMemo(() => {
    const xAxisLabels = (value: string | number, index: number) => {
      return [AssetHistoryDuration.day, AssetHistoryDuration.week].includes(
        duration
      )
        ? new Date(value).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : [AssetHistoryDuration.year, AssetHistoryDuration.all].includes(
            duration
          )
        ? new Date(value).toLocaleDateString([], {
            year: "numeric",
            month: "short",
          })
        : new Date(value).toLocaleDateString([], {
            month: "short",
            day: "2-digit",
          });
    };
    return {
      responsive: true,
      scales: {
        //XY axis config
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#fff",
            callback: xAxisLabels,
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#fff",
            callback: (value: string | number) =>
              formatValue(
                typeof value === "string" ? parseFloat(value) : value,
                "$0,0",
                6
              ), // Format as currency
          },
        },
      },
      plugins: {
        tooltip: {
          mode: "index", // Show tooltips for all datasets at the same index
          intersect: false, // Show tooltips anywhere on the graph
        },
        legend: {
          labels: {
            color: "#fff",
          },
        },
      },
    };
  }, [duration]);

  return <Line options={options} data={data} />;
};

export default LineChart;
