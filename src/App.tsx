import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.scss";
import RequiresAuth from "./Components/RequiresAuth";
import ViewDashboard from "./Pages/ViewDashboard";
import ViewLogin from "./Pages/ViewLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<ViewLogin />} />
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route
          path="/home"
          element={
            <RequiresAuth>
              <ViewDashboard />
            </RequiresAuth>
          }
        />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
