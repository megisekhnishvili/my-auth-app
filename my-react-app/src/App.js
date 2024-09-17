// src/App.js
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";

const App = () => {
  const { user, login, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage login={login} />
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} user={user} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
