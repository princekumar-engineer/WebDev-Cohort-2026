import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const { user, loading } = useAuth();

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // NOT AUTHENTICATED
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // AUTHENTICATED
  return children;
}