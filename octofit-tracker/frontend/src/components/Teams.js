import React, { useEffect, useState } from 'react';
import { getEndpoint } from '../config';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = getEndpoint('teams');

  const fetchTeams = () => {
    setLoading(true);
    console.log('Fetching from endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('✅ Teams API endpoint:', endpoint);
        console.log('✅ Fetched teams data:', data);
        setTeams(data.results || data);
        setError(null);
      })
      .catch(err => {
        console.error('❌ Error fetching teams:', err.message);
        setError(`Failed to fetch teams: ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeams();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>{error}</p>
        <button className="btn btn-danger" onClick={fetchTeams}>
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">🤝 Teams</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Team Management</h5>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <p>No teams found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Team Name</th>
                    <th>Description</th>
                    <th>Members</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      <td>{team.id || '-'}</td>
                      <td>{team.name || team.team_name || '-'}</td>
                      <td>{team.description || '-'}</td>
                      <td>{team.members_count || team.members?.length || '-'}</td>
                      <td><span className="badge bg-primary">{team.score || 0}</span></td>
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

export default Teams;
