import React, { useEffect, useState } from 'react';
import { getEndpoint } from '../config';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = getEndpoint('leaderboard');

  const fetchLeaderboard = () => {
    setLoading(true);
    console.log('Fetching from endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('✅ Leaderboard API endpoint:', endpoint);
        console.log('✅ Fetched leaderboard data:', data);
        setLeaderboard(data.results || data);
        setError(null);
      })
      .catch(err => {
        console.error('❌ Error fetching leaderboard:', err.message);
        setError(`Failed to fetch leaderboard: ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>{error}</p>
        <button className="btn btn-danger" onClick={fetchLeaderboard}>
          🔄 Retry
        </button>
      </div>
    );
  }

  const getMedalEmoji = (position) => {
    if (position === 0) return '🥇';
    if (position === 1) return '🥈';
    if (position === 2) return '🥉';
    return position + 1;
  };

  return (
    <div>
      <h1 className="page-title">🏆 Leaderboard</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Top Performers</h5>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏆</div>
              <p>No leaderboard data found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User/Team</th>
                    <th>Score</th>
                    <th>Activities</th>
                    <th>Total Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr key={entry.id || idx}>
                      <td>
                        <strong>{getMedalEmoji(idx)}</strong>
                      </td>
                      <td>{entry.name || entry.username || entry.user_name || '-'}</td>
                      <td>
                        <span className="badge bg-primary fs-6">{entry.score || 0}</span>
                      </td>
                      <td>{entry.activity_count || entry.activities || '-'}</td>
                      <td>{entry.total_duration || '-'} mins</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
