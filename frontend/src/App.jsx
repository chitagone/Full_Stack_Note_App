import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
