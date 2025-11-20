import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import '../styles/UserCard.css';
export const UserCard = ({ user, onDelete, isLoading = false }) => {
    // Handle delete with confirmation
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            onDelete(user.id);
        }
    };
    // Get initials for avatar
    const getInitials = (name) => {
        return name
            .split(/\s+/)
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    const initials = getInitials(user.name);
    const bgColor = `hsl(${user.id * 60}, 70%, 70%)`;
    return (_jsxs("div", { className: "user-row", children: [_jsxs("div", { className: "user-info", children: [_jsx("div", { className: "avatar", style: { backgroundColor: bgColor }, children: initials }), _jsxs("div", { className: "user-details", children: [_jsx("h3", { children: user.name }), _jsxs("div", { className: "contact-info", children: [_jsx("span", { className: "email", children: user.email }), _jsx("span", { className: "phone", children: user.phone }), user.username && _jsx("span", { className: "username", children: user.username })] })] })] }), _jsxs("div", { className: "user-actions", children: [_jsx(Link, { to: `/user/${user.id}`, className: "action-btn view-btn", title: "View details", children: "\uD83D\uDC41\uFE0F View" }), _jsx(Link, { to: `/user/${user.id}/edit`, className: "action-btn edit-btn", title: "Edit user", children: "\u270F\uFE0F Edit" }), _jsx("button", { onClick: handleDelete, disabled: isLoading, className: "action-btn delete-btn", title: "Delete user", children: "\uD83D\uDDD1\uFE0F Delete" })] })] }));
};
