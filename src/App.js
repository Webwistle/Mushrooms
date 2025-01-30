import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider
import CreateAccountPage from "./Pages/CreateAccountPage";
import LoginAccountPage from "./Pages/LoginAccountPage";
import HomePage from "./Pages/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginAccountPage />} />
          <Route path="/signup" element={<CreateAccountPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ✅ Fix: Return {children} instead of <HomePage />
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  return user ? children : <Navigate to="/login" />;
};

export default App;
