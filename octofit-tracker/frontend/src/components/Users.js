import React, { useEffect, useState } from 'react';
import { getEndpoint } from '../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Codespace API endpoint for users: -8000.app.github.dev/api/users
  const endpoint = getEndpoint('users');

  const fetchUsers = () => {
    setLoading(true);
    console.log('Fetching from endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('✅ Users API endpoint:', endpoint);
        console.log('✅ Fetched users data:', data);
        setUsers(data.results || data);
        setError(null);
      })
      .catch(err => {
        console.error('❌ Error fetching users:', err.message);
        setError(`Failed to fetch users: ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>{error}</p>
        <button className="btn btn-danger" onClick={fetchUsers}>
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">👥 Users</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">User Directory</h5>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <p>No users found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id || idx}>
                      <td>{user.id || '-'}</td>
                      <td>{user.username || '-'}</td>
                      <td>{user.email || '-'}</td>
                      <td>{user.first_name || '-'}</td>
                      <td>{user.last_name || '-'}</td>
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

export default Users;
