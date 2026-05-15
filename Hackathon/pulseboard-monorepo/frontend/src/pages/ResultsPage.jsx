import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import {
  Users,
  Globe,
  Lock,
  FileText,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../lib/axios";

const COLORS = [
  "#4f6ef7",
  "#36c690",
  "#f7c948",
  "#ff6b6b",
  "#e056fd",
  "#14b8a6",
  "#f97316",
];

export default function ResultsPage() {
  const {
    id: pollId,
  } = useParams();

  const navigate =
    useNavigate();

  const [
    analytics,
    setAnalytics,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH RESULTS
  useEffect(() => {
    if (!pollId) return;

    const fetchResults =
      async () => {
        try {
          const response =
            await api.get(
              `/analytics/${pollId}/public-results`
            );

          setAnalytics(
            response.data
              .analytics
          );
        } catch (error) {
          console.log(error);

          navigate("/404");
        } finally {
          setLoading(false);
        }
      };

    fetchResults();
  }, [pollId, navigate]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        <h1 className="text-3xl font-bold">
          Loading Results...
        </h1>
      </div>
    );
  }

  // NO DATA
  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        <h1 className="text-3xl font-bold">
          Results Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] px-6 py-10">
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-100">
        {/* TOP BORDER */}
        <div className="h-2 bg-linear-to-r from-violet-600 to-indigo-600" />

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 p-8">
          {/* LEFT */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Poll Results
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              Public Analytics
              Dashboard
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-4">
            {/* LOGO */}
            <h2 className="text-3xl font-bold text-violet-600">
              PulseBoard
            </h2>

            {/* STATUS */}
            <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full flex items-center gap-2 font-medium">
              <div className="w-3 h-3 rounded-full bg-green-500" />

              Published
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-8">
          {/* TOTAL RESPONSES */}
          <div className="border border-gray-100 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
                <Users className="text-violet-600" />
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900">
                  {
                    analytics.totalResponses
                  }
                </h2>

                <p className="text-gray-500 mt-1">
                  Total
                  Responses
                </p>
              </div>
            </div>
          </div>

          {/* ANONYMOUS */}
          <div className="border border-gray-100 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <Globe className="text-green-600" />
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Enabled
                </h2>

                <p className="text-gray-500 mt-1">
                  Anonymous
                </p>
              </div>
            </div>
          </div>

          {/* AUTH */}
          <div className="border border-gray-100 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Lock className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Secure
                </h2>

                <p className="text-gray-500 mt-1">
                  Protected
                </p>
              </div>
            </div>
          </div>

          {/* QUESTIONS */}
          <div className="border border-gray-100 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <FileText className="text-yellow-600" />
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900">
                  {
                    analytics
                      .questions
                      .length
                  }
                </h2>

                <p className="text-gray-500 mt-1">
                  Questions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="p-8 space-y-20">
          {analytics.questions.map(
            (
              question,
              questionIndex
            ) => {
              const chartData =
                question.options.map(
                  (
                    option,
                    index
                  ) => ({
                    name:
                      option.option,

                    value:
                      Number(
                        option.percentage
                      ),

                    count:
                      option.votes,

                    color:
                      COLORS[
                        index %
                          COLORS.length
                      ],
                  })
                );

              const finalChartData =
                chartData.length
                  ? chartData
                  : [
                      {
                        name:
                          "No Votes",
                        value: 100,
                        count: 0,
                        color:
                          "#e5e7eb",
                      },
                    ];

              return (
                <div
                  key={
                    question.questionId
                  }
                >
                  {/* TITLE */}
                  <h2 className="text-4xl font-bold text-gray-900 mb-10">
                    {
                      questionIndex +
                      1
                    }
                    .{" "}
                    {
                      question.question
                    }
                  </h2>

                  {/* CONTENT */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
                    {/* CHART */}
                    <div className="h-105">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <PieChart>
                          <Pie
                            data={
                              finalChartData
                            }
                            cx="50%"
                            cy="50%"
                            innerRadius={
                              90
                            }
                            outerRadius={
                              150
                            }
                            dataKey="value"
                            paddingAngle={
                              3
                            }
                          >
                            {finalChartData.map(
                              (
                                entry,
                                index
                              ) => (
                                <Cell
                                  key={
                                    index
                                  }
                                  fill={
                                    entry.color
                                  }
                                />
                              )
                            )}
                          </Pie>

                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* LEGEND */}
                    <div className="space-y-6">
                      {finalChartData.map(
                        (
                          item
                        ) => (
                          <div
                            key={
                              item.name
                            }
                            className="flex items-center justify-between"
                          >
                            {/* LEFT */}
                            <div className="flex items-center gap-4">
                              <div
                                className="w-5 h-5 rounded-full"
                                style={{
                                  backgroundColor:
                                    item.color,
                                }}
                              />

                              <span className="text-2xl font-medium text-gray-800">
                                {
                                  item.name
                                }
                              </span>
                            </div>

                            {/* RIGHT */}
                            <span className="text-2xl font-semibold text-gray-700">
                              {
                                item.value
                              }
                              % (
                              {
                                item.count
                              }
                              )
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}