import {
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import Dashboard from "../pages/Dashboard";
import CreatePollPage from "../pages/CreatePollPage";
import MyPollsPage from "../pages/MyPollsPage";
import PollDetailsPage from "../pages/PollDetailsPage";
import EditPollPage from "../pages/EditPollPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import ProfilePage from "../pages/ProfilePage";

import PublicPollPage from "../pages/PublicPollPage";
import ResultsPage from "../pages/ResultsPage";

import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/p/:pollId"
        element={<PublicPollPage />}
      />

      <Route
        path="/p/:pollId/results"
        element={<ResultsPage />}
      />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/polls"
        element={
          <ProtectedRoute>
            <MyPollsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/polls/create"
        element={
          <ProtectedRoute>
            <CreatePollPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/polls/:id"
        element={
          <ProtectedRoute>
            <PollDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/polls/:id/edit"
        element={
          <ProtectedRoute>
            <EditPollPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/polls/:id/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}