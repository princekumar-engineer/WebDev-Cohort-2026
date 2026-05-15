import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  BarChart3,
  Globe,
  Lock,
  Clock3,
} from "lucide-react";

import {
  getMyPolls,
  deletePoll,
} from "../services/pollService";

export default function MyPollsPage() {
  const [polls, setPolls] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [
    visibilityFilter,
    setVisibilityFilter,
  ] = useState("All");

  // FETCH POLLS
  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls =
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

  // DELETE POLL
  const handleDelete =
    async (pollId) => {
      const confirmDelete =
        window.confirm(
          "Delete this poll?"
        );

      if (!confirmDelete)
        return;

      try {
        await deletePoll(
          pollId
        );

        setPolls(
          polls.filter(
            (poll) =>
              poll._id !==
              pollId
          )
        );

        alert(
          "Poll deleted successfully"
        );
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to delete poll"
        );
      }
    };

  // GET STATUS
  const getStatus = (poll) => {
    if (poll.is_published)
      return "Completed";

    if (
      poll.expiry_time &&
      new Date(
        poll.expiry_time
      ) < new Date()
    ) {
      return "Expired";
    }

    return "Active";
  };

  // FILTER POLLS
  const filteredPolls =
    polls.filter((poll) => {
      const matchesSearch =
        poll.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const status =
        getStatus(poll);

      const visibility =
        poll.requires_auth
          ? "Private"
          : "Public";

      const matchesStatus =
        statusFilter === "All" ||
        status ===
          statusFilter;

      const matchesVisibility =
        visibilityFilter ===
          "All" ||
        visibility ===
          visibilityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVisibility
      );
    });

  // LOADING
  if (loading) {
    return (
      <PageContainer>
        <div className="text-center py-20 text-2xl font-semibold">
          Loading Polls...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            My Polls
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your polls,
            responses, and
            analytics.
          </p>
        </div>

        <Link to="/polls/create">
          <button className="bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2">
            <Plus size={20} />
            Create Poll
          </button>
        </Link>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search polls..."
              className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* STATUS */}
          <select
            value={
              statusFilter
            }
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Expired">
              Expired
            </option>
          </select>

          {/* VISIBILITY */}
          <select
            value={
              visibilityFilter
            }
            onChange={(e) =>
              setVisibilityFilter(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="All">
              All Visibility
            </option>

            <option value="Public">
              Public
            </option>

            <option value="Private">
              Private
            </option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolls.map(
          (poll) => {
            const status =
              getStatus(
                poll
              );

            const visibility =
              poll.requires_auth
                ? "Private"
                : "Public";

            return (
              <div
                key={poll._id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {poll.title}
                    </h2>

                    <div className="flex items-center gap-3 mt-4">
                      {/* STATUS */}
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          status ===
                          "Active"
                            ? "bg-green-100 text-green-700"
                            : status ===
                              "Completed"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {status}
                      </span>

                      {/* VISIBILITY */}
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        {visibility ===
                        "Public" ? (
                          <Globe
                            size={16}
                          />
                        ) : (
                          <Lock
                            size={16}
                          />
                        )}

                        {
                          visibility
                        }
                      </span>
                    </div>
                  </div>

                  {/* QUESTIONS */}
                  <div className="bg-violet-50 rounded-2xl px-5 py-4 text-center">
                    <h3 className="text-3xl font-bold text-violet-600">
                      {
                        poll.questions
                          .length
                      }
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Questions
                    </p>
                  </div>
                </div>

                {/* DATE */}
                <div className="flex items-center gap-2 text-gray-500 mt-6">
                  <Clock3
                    size={16}
                  />

                  <span className="text-sm">
                    Created{" "}
                    {new Date(
                      poll.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {/* VIEW */}
                  <Link
                    to={`/polls/${poll._id}`}
                  >
                    <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition text-white px-5 py-3 rounded-2xl font-medium">
                      <Eye
                        size={18}
                      />
                      View
                    </button>
                  </Link>

                  {/* EDIT */}
                  <Link
                    to={`/polls/${poll._id}/edit`}
                  >
                    <button className="flex items-center gap-2 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition px-5 py-3 rounded-2xl font-medium">
                      <Pencil
                        size={18}
                      />
                      Edit
                    </button>
                  </Link>

                  {/* ANALYTICS */}
                  <Link
                    to={`/polls/${poll._id}/analytics`}
                  >
                    <button className="flex items-center gap-2 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition px-5 py-3 rounded-2xl font-medium">
                      <BarChart3
                        size={18}
                      />
                      Analytics
                    </button>
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(
                        poll._id
                      )
                    }
                    className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 transition px-5 py-3 rounded-2xl font-medium"
                  >
                    <Trash2
                      size={18}
                    />
                    Delete
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* EMPTY */}
      {filteredPolls.length ===
        0 && (
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center mt-6">
          <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-6">
            <Plus
              size={36}
              className="text-violet-600"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            No Polls Found
          </h2>

          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Create your first poll
            and start collecting
            responses.
          </p>

          <Link to="/polls/create">
            <button className="mt-8 bg-violet-600 hover:bg-violet-700 transition text-white px-8 py-4 rounded-2xl font-medium">
              Create Poll
            </button>
          </Link>
        </div>
      )}
    </PageContainer>
  );
}