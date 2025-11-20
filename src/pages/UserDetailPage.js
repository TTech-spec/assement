import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Detailed user view and edit page
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import * as api from '../services/api';
import '../styles/UserDetailPage.css';
export const UserDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Fetch user details on component mount
    useEffect(() => {
        if (id && /^\d+$/.test(id)) {
            loadUser(parseInt(id, 10));
        }
        else if (id) {
            setError('Invalid user ID provided.');
        }
    }, [id]);
    // Set editing mode based on URL
    useEffect(() => {
        setIsEditing(location.pathname.includes('/edit'));
    }, [location.pathname]);
    // Load user from API
    const loadUser = async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.fetchUserById(userId);
            setUser(data);
        }
        catch (err) {
            setError('Failed to load user details. Please try again.');
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Handle update user
    const handleUpdateUser = async (formData) => {
        if (!user)
            return;
        setIsSubmitting(true);
        try {
            const updatedUser = await api.updateUser(user.id, formData);
            setUser({ ...user, ...updatedUser });
            setIsEditing(false);
            alert('✅ User updated successfully!');
        }
        catch (err) {
            alert('❌ Failed to update user. Please try again.');
            console.error(err);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    // Handle delete user
    const handleDeleteUser = async () => {
        if (!user)
            return;
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            try {
                await api.deleteUser(user.id);
                alert('✅ User deleted successfully!');
                navigate('/');
            }
            catch (err) {
                alert('❌ Failed to delete user. Please try again.');
                console.error(err);
            }
        }
    };
    if (isLoading) {
        return _jsx("div", { className: "detail-page loading", children: "\u23F3 Loading user details..." });
    }
    if (error) {
        return (_jsxs("div", { className: "detail-page error", children: [_jsx("p", { children: error }), _jsx("button", { onClick: () => navigate('/'), className: "btn-back", children: "\u2190 Back to Users" })] }));
    }
    if (!user) {
        return (_jsxs("div", { className: "detail-page not-found", children: [_jsx("p", { children: "\u274C User not found" }), _jsx("button", { onClick: () => navigate('/'), className: "btn-back", children: "\u2190 Back to Users" })] }));
    }
    return (_jsxs("div", { className: "detail-page", children: [_jsx("button", { onClick: () => navigate('/'), className: "btn-back", children: "\u2190 Back to Users" }), _jsx("div", { className: "detail-container", children: isEditing ? (_jsx("div", { className: "edit-section", children: _jsx(UserForm, { initialData: user, onSubmit: handleUpdateUser, isLoading: isSubmitting, isEditing: true }) })) : (_jsxs("div", { className: "view-section", children: [_jsxs("div", { className: "detail-header", children: [_jsx("h1", { children: user.name }), _jsxs("div", { className: "detail-actions", children: [_jsx("button", { onClick: () => setIsEditing(true), className: "action-btn edit", children: "\u270F\uFE0F Edit" }), _jsx("button", { onClick: handleDeleteUser, className: "action-btn delete", children: "\uD83D\uDDD1\uFE0F Delete" })] })] }), _jsxs("div", { className: "detail-info", children: [_jsxs("div", { className: "info-section", children: [_jsx("h3", { children: "\uD83D\uDC64 Personal Information" }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "\uD83D\uDCDD Full Name" }), _jsx("span", { className: "info-value", children: user.name })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "\uD83D\uDC64 Username" }), _jsx("span", { className: "info-value", children: user.username })] })] }), _jsxs("div", { className: "info-section", children: [_jsx("h3", { children: "\uD83D\uDCDE Contact Information" }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "\u2709\uFE0F Email" }), _jsx("span", { className: "info-value", children: _jsx("a", { href: `mailto:${user.email}`, children: user.email }) })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "\uD83D\uDCF1 Phone" }), _jsx("span", { className: "info-value", children: _jsx("a", { href: `tel:${user.phone}`, children: user.phone }) })] }), user.website && (_jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "\uD83C\uDF10 Website" }), _jsx("span", { className: "info-value", children: _jsx("a", { href: `http://${user.website}`, target: "_blank", rel: "noopener noreferrer", children: user.website }) })] }))] })] })] })) })] }));
};
