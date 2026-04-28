import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="home-title">🏋️ Octofit Tracker</h1>
        <p className="home-subtitle">Track your fitness journey with your team</p>
        <div className="features-grid">
          <Link to="/users" className="card text-decoration-none">
            <div className="card-body">
              <h5>👥 Users</h5>
              <p>Manage your team members</p>
            </div>
          </Link>
          <Link to="/activities" className="card text-decoration-none">
            <div className="card-body">
              <h5>📋 Activities</h5>
              <p>Track all your activities</p>
            </div>
          </Link>
          <Link to="/workouts" className="card text-decoration-none">
            <div className="card-body">
              <h5>💪 Workouts</h5>
              <p>View your workouts</p>
            </div>
          </Link>
          <Link to="/teams" className="card text-decoration-none">
            <div className="card-body">
              <h5>🤝 Teams</h5>
              <p>Create and manage teams</p>
            </div>
          </Link>
          <Link to="/leaderboard" className="card text-decoration-none">
            <div className="card-body">
              <h5>🏆 Leaderboard</h5>
              <p>View rankings and scores</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">🏋️ Octofit Tracker</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
