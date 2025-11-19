// Home page displaying all users with CRUD operations
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserList } from '../components/UserList';
import { UserForm } from '../components/UserForm';
import { User, UserFormData } from '../types/User';
import * as api from '../services/api';
import '../styles/HomePage.css';

export const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Load users from API
  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create user
  const handleCreateUser = async (formData: UserFormData) => {
    setIsSubmitting(true);
    try {
      const newUser = await api.createUser(formData);
      setUsers([newUser as User, ...users]);
      setShowCreateForm(false);
      alert('✅ User created successfully!');
    } catch (err) {
      alert('❌ Failed to create user. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await api.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      alert('✅ User deleted successfully!');
    } catch (err) {
      alert('❌ Failed to delete user. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>👥 User Management System</h1>
        <p>Manage your user database</p>
      </div>

      <div className="page-controls">
        <div></div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-add"
        >
          <span>+</span> Add New User
        </button>
      </div>

      {showCreateForm && (
        <div className="form-container">
          <UserForm
            onSubmit={handleCreateUser}
            isLoading={isSubmitting}
          />
        </div>
      )}

      <div className="users-section">
        <h2>All Users ({users.length})</h2>
        <UserList
          users={users}
          onDelete={handleDeleteUser}
          isLoading={isLoading}
          error={error || undefined}
        />
      </div>
    </div>
  );
};