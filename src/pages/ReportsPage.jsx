import { useSelector } from "react-redux";
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme);
  const {
    data: { data: { messages = [] } = {} } = {},
    isLoading,
    isError,
    error,
  } = useGetMessagesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const countryData = processCountryData(
    messages,
    theme,
    t("reports-page.message-count"),
  );
  const genderData = processGenderData(messages, theme, [
    t("reports-page.male"),
    t("reports-page.female"),
  ]);

  return (
    <div className="container mx-auto p-8 mb-40 bg-primary-light border-primary-dark border-2 rounded-[2rem] solid-shadow">
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-8">
        {t("reports-page.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div>
          <h2 className="text-xl text-primary-dark font-semibold mb-2">
            {t("reports-page.messages-by-country")}
          </h2>
          <Bar data={countryData} options={countryChartOptions} />
        </div>
        <div>
          <h2 className="text-xl text-primary-dark font-semibold mb-2 text-center">
            {t("reports-page.messages-by-gender")}
          </h2>
          <Pie data={genderData} options={genderChartOptions} />
        </div>
      </div>
    </div>
  );
}

function processCountryData(messages, theme, label) {
  const countryCounts = messages.reduce((acc, message) => {
    acc[message.country] = (acc[message.country] || 0) + 1;
    return acc;
  }, {});

  const sortedCountries = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .filter(([, count]) => count > 0);

  const backgroundColor = theme === "dark" ? "#4b4b29" : "#4a4a4a";

  return {
    labels: sortedCountries.map(([country]) => country),
    datasets: [
      {
        label: label,
        data: sortedCountries.map(([, count]) => count),
        backgroundColor,
      },
    ],
  };
}

function processGenderData(messages, theme, label) {
  const genderCounts = messages.reduce((acc, message) => {
    acc[message.gender] = (acc[message.gender] || 0) + 1;
    return acc;
  }, {});

  const backgroundColor = [
    theme === "dark" ? "#cc9999" : "#e57373",
    theme === "dark" ? "#005bb5" : "#0a74da",
  ];

  return {
    labels: [label[1], label[0]],
    datasets: [
      {
        data: Object.values(genderCounts),
        backgroundColor,
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
  },
};

const genderChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
