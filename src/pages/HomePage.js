import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Home page displaying all users with CRUD operations
import { useState, useEffect } from 'react';
import { UserList } from '../components/UserList';
import { UserForm } from '../components/UserForm';
import * as api from '../services/api';
import '../styles/HomePage.css';
export const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Fetch users on component mount
    useEffect(() => {
        loadUsers();
    }, []);
    // Load users from API
    const loadUsers = async () => {
        setIsLoading(true);
        setError(undefined);
        try {
            const data = await api.fetchUsers();
            setUsers(data);
        }
        catch (err) {
            setError('Failed to load users. Please try again later.');
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Handle create user
    const handleCreateUser = async (formData) => {
        setIsSubmitting(true);
        try {
            const newUser = await api.createUser(formData);
            setUsers([newUser, ...users]);
            setShowCreateForm(false);
            alert('✅ User created successfully!');
        }
        catch (err) {
            alert('❌ Failed to create user. Please try again.');
            console.error(err);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    // Handle delete user
    const handleDeleteUser = async (id) => {
        try {
            await api.deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
            alert('✅ User deleted successfully!');
        }
        catch (err) {
            alert('❌ Failed to delete user. Please try again.');
            console.error(err);
        }
    };
    return (_jsxs("div", { className: "home-page", children: [_jsxs("div", { className: "page-header", children: [_jsx("h1", { children: "\uD83D\uDC65 User Management System" }), _jsx("p", { children: "Manage your user database" })] }), _jsxs("div", { className: "page-controls", children: [_jsx("div", {}), _jsxs("button", { onClick: () => setShowCreateForm(!showCreateForm), className: "btn-add", children: [_jsx("span", { children: "+" }), " Add New User"] })] }), showCreateForm && (_jsx("div", { className: "form-container", children: _jsx(UserForm, { onSubmit: handleCreateUser, isLoading: isSubmitting }) })), _jsxs("div", { className: "users-section", children: [_jsxs("h2", { children: ["All Users (", users.length, ")"] }), _jsx(UserList, { users: users, onDelete: handleDeleteUser, isLoading: isLoading, error: error })] })] }));
};
