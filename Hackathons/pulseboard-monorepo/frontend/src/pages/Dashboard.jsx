import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";

import {
  BarChart3,
  Users,
  Vote,
  FileText,
  ArrowUpRight,
  Activity,
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

import { getMyPolls } from "../services/pollService";

const COLORS = [
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function Dashboard() {
  const [polls, setPolls] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH POLLS
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        const data =
          await getMyPolls();

        setPolls(data.polls || []);
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
          Loading Dashboard...
        </div>
      </PageContainer>
    );
  }

  // TOTAL POLLS
  const totalPolls = polls.length;

  // ACTIVE POLLS
  const activePolls = polls.filter(
    (poll) => !poll.is_published
  );

  // PUBLISHED
  const publishedPolls =
    polls.filter(
      (poll) => poll.is_published
    );

  // TOTAL QUESTIONS
  const totalQuestions =
    polls.reduce(
      (acc, poll) =>
        acc + poll.questions.length,
      0
    );

  // CHART DATA
  const lineData = polls.map(
    (poll, index) => ({
      name: `Poll ${index + 1}`,

      responses:
        poll.questions.length * 10,
    })
  );

  // PIE DATA
  const pieData = [
    {
      name: "Published",
      value: publishedPolls.length,
    },

    {
      name: "Active",
      value: activePolls.length,
    },
  ];

  // STATS
  const stats = [
    {
      title: "Total Polls",

      value: totalPolls,

      icon: <Vote size={22} />,
    },

    {
      title: "Active Polls",

      value: activePolls.length,

      icon: <BarChart3 size={22} />,
    },

    {
      title: "Questions",

      value: totalQuestions,

      icon: <Users size={22} />,
    },

    {
      title: "Published",

      value:
        publishedPolls.length,

      icon: <FileText size={22} />,
    },
  ];

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Here's what's happening
            with your polls today.
          </p>
        </div>

        {/* ACTION */}
        <Link
          to="/polls/create"
          className="bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow-violet-200"
        >
          + Create Poll
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
                {item.icon}
              </div>

              <ArrowUpRight
                className="text-green-500"
                size={20}
              />
            </div>

            <h2 className="text-4xl font-bold mt-6">
              {item.value}
            </h2>

            <p className="text-gray-500 mt-2">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          {/* ANALYTICS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">
                  Poll Activity
                </h2>

                <p className="text-gray-500 mt-1">
                  Poll engagement overview
                </p>
              </div>

              <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                <Activity size={16} />
                Live
              </div>
            </div>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <LineChart data={lineData}>
                <XAxis dataKey="name" />

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

          {/* RECENT POLLS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Recent Polls
            </h2>

            <div className="space-y-5">
              {polls
                .slice(0, 5)
                .map((poll) => (
                  <Link
                    key={poll._id}
                    to={`/polls/${poll._id}`}
                    className="block border border-gray-100 rounded-2xl p-5 hover:border-violet-200 transition"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        {poll.title}
                      </h3>

                      <span className="text-sm text-gray-500">
                        {
                          poll.questions
                            .length
                        }{" "}
                        Questions
                      </span>
                    </div>

                    <p className="text-gray-500 mt-2">
                      {
                        poll.description
                      }
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* PIE */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Poll Summary
            </h2>

            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  label
                >
                  {pieData.map(
                    (entry, index) => (
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

            {/* LEGEND */}
            <div className="space-y-3 mt-5">
              {pieData.map(
                (item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[
                              index
                            ],
                        }}
                      />

                      <span className="text-gray-700">
                        {item.name}
                      </span>
                    </div>

                    <span className="font-semibold">
                      {item.value}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ACTIVE POLLS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Active Polls
              </h2>

              <Link
                to="/polls"
                className="text-violet-600 text-sm font-medium"
              >
                View all
              </Link>
            </div>

            <div className="space-y-5">
              {activePolls
                .slice(0, 5)
                .map((poll) => (
                  <Link
                    key={poll._id}
                    to={`/polls/${poll._id}`}
                    className="block border border-gray-100 rounded-2xl p-4 hover:border-violet-200 transition"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        {poll.title}
                      </h3>

                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Active
                      </span>
                    </div>

                    <p className="text-gray-500 mt-3 text-sm">
                      {
                        poll.questions
                          .length
                      }{" "}
                      Questions
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}