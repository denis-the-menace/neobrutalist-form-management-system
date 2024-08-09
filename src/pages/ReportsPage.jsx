import { useGetMessagesQuery } from "../slices/messageApiSlice";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export default function ReportsPage() {
  const {
    data: { data: { messages = [] } = {} } = {},
    isLoading,
    isError,
    error,
  } = useGetMessagesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Process data for charts
  const countryData = processCountryData(messages);
  const genderData = processGenderData(messages);

  return (
    <div className="container mx-auto p-8 mb-40 bg-primary-light border-primary-dark border-2 rounded-[2rem] solid-shadow">
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-8">REPORTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Messages by Country</h2>
          <Bar data={countryData} options={countryChartOptions} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Messages by Gender</h2>
          <Pie data={genderData} options={genderChartOptions} />
        </div>
      </div>
    </div>
  );
}

function processCountryData(messages) {
  const countryCounts = messages.reduce((acc, message) => {
    acc[message.country] = (acc[message.country] || 0) + 1;
    return acc;
  }, {});

  const sortedCountries = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .filter(([, count]) => count > 0);

  return {
    labels: sortedCountries.map(([country]) => country),
    datasets: [
      {
        label: "Message Count",
        data: sortedCountries.map(([, count]) => count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
}

function processGenderData(messages) {
  const genderCounts = messages.reduce((acc, message) => {
    acc[message.gender] = (acc[message.gender] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        data: Object.values(genderCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };
}

const countryChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Message Count by Country",
    },
  },
};

const genderChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Message Count by Gender",
    },
  },
};
