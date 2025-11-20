// Detailed user view and edit page
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { User, UserFormData } from '../types/User';
import { UserForm } from '../components/UserForm';
import * as api from '../services/api';
import '../styles/UserDetailPage.css';

export const UserDetailPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user details on component mount
  useEffect(() => {
    if (id && /^\d+$/.test(id)) {
      loadUser(parseInt(id, 10));
    } else if (id) {
      setError('Invalid user ID provided.');
    }
  }, [id]);

  // Set editing mode based on URL
  useEffect(() => {
    setIsEditing(location.pathname.includes('/edit'));
  }, [location.pathname]);

  // Load user from API
  const loadUser = async (userId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.fetchUserById(userId);
      setUser(data);
    } catch (err) {
      setError('Failed to load user details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle update user
  const handleUpdateUser = async (formData: UserFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const updatedUser = await api.updateUser(user.id, formData);
      setUser({ ...user, ...updatedUser } as User);
      setIsEditing(false);
      alert('✅ User updated successfully!');
    } catch (err) {
      alert('❌ Failed to update user. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!user) return;

    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await api.deleteUser(user.id);
        alert('✅ User deleted successfully!');
        navigate('/');
      } catch (err) {
        alert('❌ Failed to delete user. Please try again.');
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <div className="detail-page loading">⏳ Loading user details...</div>;
  }

  if (error) {
    return (
      <div className="detail-page error">
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn-back">
          ← Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="detail-page not-found">
        <p>❌ User not found</p>
        <button onClick={() => navigate('/')} className="btn-back">
          ← Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Back to Users
      </button>

      <div className="detail-container">
        {isEditing ? (
          <div className="edit-section">
            <UserForm
              initialData={user}
              onSubmit={handleUpdateUser}
              isLoading={isSubmitting}
              isEditing={true}
            />
          </div>
        ) : (
          <div className="view-section">
            <div className="detail-header">
              <h1>{user.name}</h1>
              <div className="detail-actions">
                <button
                  onClick={() => setIsEditing(true)}
                  className="action-btn edit"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="action-btn delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>

            <div className="detail-info">
              <div className="info-section">
                <h3>👤 Personal Information</h3>
                <div className="info-row">
                  <span className="info-label">📝 Full Name</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">👤 Username</span>
                  <span className="info-value">{user.username}</span>
                </div>
              </div>

              <div className="info-section">
                <h3>📞 Contact Information</h3>
                <div className="info-row">
                  <span className="info-label">✉️ Email</span>
                  <span className="info-value">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">📱 Phone</span>
                  <span className="info-value">
                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                  </span>
                </div>
                {user.website && (
                  <div className="info-row">
                    <span className="info-label">🌐 Website</span>
                    <span className="info-value">
                      <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                        {user.website}
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};