import React, { useEffect, useState } from 'react';
import { getEndpoint } from '../config';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Codespace API endpoint for workouts: -8000.app.github.dev/api/workouts
  const endpoint = getEndpoint('workouts');

  const fetchWorkouts = () => {
    setLoading(true);
    console.log('Fetching from endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('✅ Workouts API endpoint:', endpoint);
        console.log('✅ Fetched workouts data:', data);
        setWorkouts(data.results || data);
        setError(null);
      })
      .catch(err => {
        console.error('❌ Error fetching workouts:', err.message);
        setError(`Failed to fetch workouts: ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWorkouts();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>{error}</p>
        <button className="btn btn-danger" onClick={fetchWorkouts}>
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">💪 Workouts</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Workout History</h5>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💪</div>
              <p>No workouts found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Duration (mins)</th>
                    <th>Calories Burned</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      <td>{workout.id || '-'}</td>
                      <td>{workout.name || workout.title || '-'}</td>
                      <td>{workout.type || workout.workout_type || '-'}</td>
                      <td>{workout.duration || '-'}</td>
                      <td>{workout.calories_burned || '-'}</td>
                      <td>
                        {workout.difficulty && (
                          <span className={`badge bg-${
                            workout.difficulty === 'Easy' ? 'success' :
                            workout.difficulty === 'Medium' ? 'warning' :
                            'danger'
                          }`}>
                            {workout.difficulty}
                          </span>
                        )}
                        {!workout.difficulty && '-'}
                      </td>
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

export default Workouts;
