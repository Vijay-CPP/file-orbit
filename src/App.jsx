import { Route, Routes } from "react-router-dom";

// Auth Provider
import { UserAuthContextProvider } from "./context/UserAuthContext";

// Importing Components
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import HomePage from "./components/HomePage";
import Dashboard from "./components/drive/Dashboard";
import UpdateProfile from "./components/user/UpdateProfile"

function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/folder/:folderId"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
