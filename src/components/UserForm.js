import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Form component for creating and updating users
import { useState, useEffect } from 'react';
import '../styles/UserForm.css';
export const UserForm = ({ onSubmit, initialData, isLoading = false, isEditing = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
    });
    const [errors, setErrors] = useState({});
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Name is required';
        if (!formData.email.trim())
            newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = 'Invalid email format';
        if (!formData.phone.trim())
            newErrors.phone = 'Phone is required';
        if (!formData.username.trim())
            newErrors.username = 'Username is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "user-form", children: [_jsx("h2", { children: isEditing ? 'Edit User' : 'Create New User' }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "Name *" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Enter full name", disabled: isLoading }), errors.name && _jsx("span", { className: "error", children: errors.name })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email *" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, placeholder: "Enter email", disabled: isLoading }), errors.email && _jsx("span", { className: "error", children: errors.email })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "phone", children: "Phone *" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, placeholder: "Enter phone number", disabled: isLoading }), errors.phone && _jsx("span", { className: "error", children: errors.phone })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "username", children: "Username *" }), _jsx("input", { type: "text", id: "username", name: "username", value: formData.username, onChange: handleChange, placeholder: "Enter username", disabled: isLoading }), errors.username && _jsx("span", { className: "error", children: errors.username })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "btn-submit", children: isLoading ? 'Submitting...' : isEditing ? 'Update User' : 'Create User' })] }));
};
