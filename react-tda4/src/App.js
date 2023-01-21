import { Route, Routes, Link, Navigate } from "react-router-dom";
import './App.css';
import Nav from "./components/Nav/Nav";
import Index from './components/Index/Index'
import SignUp from "./components/Signup/SignUp";
import Login from './components/Login/Login'
import Profile from "./components/Profile/Profile";
import PackageDetail from "./components/PackageDetail/PackageDetail";
import Invest from "./components/Invest/Invest";
import InvestDetail from "./components/InvestDetail/InvestDetail";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/fund/:id" element={<InvestDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invest" element={<Invest />} />
        </Routes>
      </main>
      <footer>
        <h2>insurances funds </h2>
        <h3><span>About us : </span>@KWANMHN</h3>
      </footer>
    </div>
  );
}

export default App;
