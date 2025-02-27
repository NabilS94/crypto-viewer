import { AssetHistoryDuration } from '@/typings/models';
import { formatValue } from '@/utils/business';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip
} from 'chart.js';
import 'chartjs-adapter-moment';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale
);

interface LineChartProps {
  chartData: { priceUsd: string; time: number }[];
  chartLabel: string;
  duration: AssetHistoryDuration;
}

const trendStyle = {
  stable: {
    borderColor: '#a0aec0',
    gradient: { in: 'rgba(0,0,0,0.3)', out: 'rgba(0,0,0,0)' }
  },
  asc: {
    borderColor: '#51ebad',
    gradient: { in: 'rgba(81,235,173,0.3)', out: 'rgba(81,235,173,0.1)' }
  },
  desc: {
    borderColor: '#ef4537',
    gradient: { in: 'rgba(239,69,55,0.3)', out: 'rgba(239,69,55,0.1)' }
  }
};

const LineChart = ({ chartData, chartLabel, duration }: LineChartProps) => {
  const latestPrice = Number(chartData[chartData.length - 1].priceUsd);
  const initialPrice = Number(chartData[0].priceUsd);

  const trend = latestPrice > initialPrice ? 'asc' : latestPrice < initialPrice ? 'desc' : 'stable';

  const data = useMemo(() => {
    let gradient: CanvasGradient | undefined;
    try {
      const ctx = document.createElement('canvas').getContext('2d');
      gradient = ctx?.createLinearGradient(0, 0, 0, 400);
      gradient?.addColorStop(0, trendStyle[trend].gradient.in);
      gradient?.addColorStop(1, trendStyle[trend].gradient.out);
    } catch (err) {
      console.log(err);
    }

    return {
      labels: chartData.map((entry) => entry.time),
      datasets: [
        {
          label: chartLabel,
          fill: true,
          data: chartData.map((entry) => parseFloat(entry.priceUsd)),
          borderColor: trendStyle[trend].borderColor,
          backgroundColor: gradient ?? 'rgba(0,0,0,0.1)',
          pointRadius: 0
        }
      ]
    };
  }, [chartData, trend, chartLabel]);

  // Line chart options
  const options: ChartOptions<'line'> = useMemo(() => {
    return {
      responsive: true,
      scales: {
        //XY axis config
        x: {
          type: 'time',
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          time: {
            unit: [AssetHistoryDuration.day, AssetHistoryDuration.week].includes(duration)
              ? 'hour'
              : [AssetHistoryDuration.year, AssetHistoryDuration.all].includes(duration)
                ? 'month'
                : 'day',
            displayFormats: {
              hour: 'HH:mm',
              day: 'MMM DD',
              month: 'MMM YYYY'
            }
          },
          ticks: {
            color: '#fff'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#fff',
            callback: (value: string | number) =>
              formatValue(typeof value === 'string' ? parseFloat(value) : value, '$0,0', 6) // Format as currency
          }
        }
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false // Show tooltips anywhere on the graph
        },
        legend: {
          labels: {
            color: '#fff'
          }
        }
      }
    };
  }, [duration]);

  return <Line options={options} data={data} />;
};

export default LineChart;
