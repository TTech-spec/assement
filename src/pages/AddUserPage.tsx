import { UserForm } from '../components/UserForm';
import type { UserFormData } from '../types/User';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as api from '../services/api';
import '../styles/AddUserPage.css';

export const AddUserPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateUser = async (formData: UserFormData) => {
    setIsSubmitting(true);
    try {
      await api.createUser(formData);
      alert('✅ User created successfully!');
      navigate('/');
    } catch (err) {
      alert('❌ Failed to create user. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-user-page">
      <div className="page-header">
        <h1>➕ Add New User</h1>
        <p>Create a new user account</p>
      </div>

      <div className="form-container">
        <UserForm
          onSubmit={handleCreateUser}
          isLoading={isSubmitting}
        />
      </div>

      <div className="page-actions">
        <button
          onClick={() => navigate('/')}
          className="btn-back"
        >
          ← Back to Users
        </button>
      </div>
    </div>
  );
};
