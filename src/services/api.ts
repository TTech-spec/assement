// API service for handling all CRUD operations
import type { User, UserFormData } from '../types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch single user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Create new user (simulated)
export const createUser = async (userData: UserFormData): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user (simulated)
export const updateUser = async (id: number, userData: UserFormData): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user (simulated)
export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};