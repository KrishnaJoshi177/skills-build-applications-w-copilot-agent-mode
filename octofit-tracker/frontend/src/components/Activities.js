import React, { useEffect, useState } from 'react';
import { getEndpoint } from '../config';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = getEndpoint('activities');

  const fetchActivities = () => {
    setLoading(true);
    console.log('Fetching from endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('✅ Activities API endpoint:', endpoint);
        console.log('✅ Fetched activities data:', data);
        setActivities(data.results || data);
        setError(null);
      })
      .catch(err => {
        console.error('❌ Error fetching activities:', err.message);
        setError(`Failed to fetch activities: ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchActivities();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>{error}</p>
        <button className="btn btn-danger" onClick={fetchActivities}>
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">📋 Activities</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">All Activities</h5>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>No activities found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={activity.id || idx}>
                      <td>{activity.id || '-'}</td>
                      <td>{activity.title || activity.name || '-'}</td>
                      <td>{activity.description || '-'}</td>
                      <td>{activity.duration || '-'}</td>
                      <td>{activity.calories || '-'}</td>
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

export default Activities;
