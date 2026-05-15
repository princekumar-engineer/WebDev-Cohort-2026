import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";

import {
  Users,
  Globe,
  Lock,
  BarChart3,
  Activity,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getAnalytics } from "../services/analyticsService";

import { getPollById } from "../services/pollService";

import socket from "../lib/socket";

const COLORS = [
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
];

export default function AnalyticsPage() {
  const { id: pollId } =
    useParams();

  const [poll, setPoll] =
    useState(null);

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH INITIAL DATA
  useEffect(() => {
    if (!pollId) return;

    fetchData();
  }, [pollId]);

  // SOCKET CONNECTION
  useEffect(() => {
    if (!pollId) return;

    socket.emit(
      "join_poll_room",
      pollId
    );

    socket.on(
      "live_analytics_update",
      (data) => {
        setAnalytics(data);
      }
    );

    return () => {
      socket.emit(
        "leave_poll_room",
        pollId
      );

      socket.off(
        "live_analytics_update"
      );
    };
  }, [pollId]);

  const fetchData = async () => {
    if (!pollId) return;

    try {
      const pollData =
        await getPollById(
          pollId
        );

      setPoll(pollData.poll);

      const analyticsData =
        await getAnalytics(
          pollId
        );

      setAnalytics(
        analyticsData.analytics
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <PageContainer>
        <div className="text-center py-20 text-xl font-semibold">
          Loading Analytics...
        </div>
      </PageContainer>
    );
  }

  // ERROR
  if (!poll || !analytics) {
    return (
      <PageContainer>
        <div className="text-center py-20 text-red-500 text-xl font-semibold">
          Analytics not found
        </div>
      </PageContainer>
    );
  }

  // PIE DATA
  const pieData =
    analytics.questions?.[0]?.options
      ?.map((option) => ({
        name: option.option,
        value: Number(
          option.percentage
        ),
      })) || [];

  // EMPTY PIE FIX
  const finalPieData =
    pieData.length
      ? pieData
      : [
          {
            name: "No Votes",
            value: 100,
          },
        ];

  // TIMELINE DATA
  const responsesData = [
    {
      time: "10AM",
      responses:
        analytics.totalResponses *
        0.2,
    },

    {
      time: "11AM",
      responses:
        analytics.totalResponses *
        0.4,
    },

    {
      time: "12PM",
      responses:
        analytics.totalResponses *
        0.6,
    },

    {
      time: "1PM",
      responses:
        analytics.totalResponses *
        0.8,
    },

    {
      time: "2PM",
      responses:
        analytics.totalResponses,
    },
  ];

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              Live
            </span>

            <div className="flex items-center gap-2 text-green-600">
              <Activity size={18} />

              <span className="font-medium">
                Real-time Analytics
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            {poll.title}
          </h1>

          <p className="text-gray-500 mt-3">
            {poll.description}
          </p>
        </div>

        <button className="bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2">
          <TrendingUp size={20} />
          Export Analytics
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {/* TOTAL RESPONSES */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
              <Users className="text-violet-600" />
            </div>
          </div>

          <h2 className="text-4xl font-bold mt-6">
            {
              analytics.totalResponses
            }
          </h2>

          <p className="text-gray-500 mt-2">
            Total Responses
          </p>
        </div>

        {/* ANONYMOUS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
            <Globe className="text-green-600" />
          </div>

          <h2 className="text-4xl font-bold mt-6">
            {poll.allow_anonymous
              ? "Yes"
              : "No"}
          </h2>

          <p className="text-gray-500 mt-2">
            Anonymous Voting
          </p>
        </div>

        {/* AUTH */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Lock className="text-blue-600" />
          </div>

          <h2 className="text-4xl font-bold mt-6">
            {poll.requires_auth
              ? "Yes"
              : "No"}
          </h2>

          <p className="text-gray-500 mt-2">
            Requires Login
          </p>
        </div>

        {/* QUESTIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
            <BarChart3 className="text-yellow-600" />
          </div>

          <h2 className="text-4xl font-bold mt-6">
            {
              poll.questions.length
            }
          </h2>

          <p className="text-gray-500 mt-2">
            Questions
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LINE */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">
            Responses Over Time
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart
              data={
                responsesData
              }
            >
              <XAxis dataKey="time" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="responses"
                stroke="#8b5cf6"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">
            Question Summary
          </h2>

          <ResponsiveContainer
            width="100%"
            height={260}
          >
            <PieChart>
              <Pie
                data={
                  finalPieData
                }
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {finalPieData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* QUESTION BREAKDOWN */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-6">
        <h2 className="text-2xl font-bold mb-8">
          Question Breakdown
        </h2>

        <div className="space-y-6">
          {analytics.questions.map(
            (
              question,
              index
            ) => (
              <div
                key={
                  question.questionId
                }
                className="border border-gray-100 rounded-3xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {index + 1}.{" "}
                  {
                    question.question
                  }
                </h3>

                <div className="space-y-4 mt-6">
                  {question.options.map(
                    (
                      option,
                      optionIndex
                    ) => (
                      <div
                        key={
                          option.optionId
                        }
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">
                            {
                              option.option
                            }
                          </span>

                          <span className="text-gray-500">
                            {
                              option.percentage
                            }
                            % (
                            {
                              option.votes
                            }
                            )
                          </span>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-500"
                            style={{
                              width: `${option.percentage}%`,
                              backgroundColor:
                                COLORS[
                                  optionIndex %
                                    COLORS.length
                                ],
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </PageContainer>
  );
}