// Form component for creating and updating users
import { useState, useEffect } from 'react';
import type { User, UserFormData } from '../types/User';
import '../styles/UserForm.css';

interface UserFormProps {
  onSubmit: (userData: UserFormData) => void;
  initialData?: User;
  isLoading?: boolean;
  isEditing?: boolean;
}

export const UserForm = ({ onSubmit, initialData, isLoading = false, isEditing = false }: UserFormProps): JSX.Element => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    username: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill form if editing
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        username: initialData.username,
      });
    }
  }, [initialData, isEditing]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof UserFormData]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({ ...prev, [name as keyof UserFormData]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{isEditing ? 'Edit User' : 'Create New User'}</h2>

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          disabled={isLoading}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          disabled={isLoading}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          disabled={isLoading}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="username">Username *</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          disabled={isLoading}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="btn-submit">
        {isLoading ? 'Submitting...' : isEditing ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};