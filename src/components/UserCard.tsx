// Individual user card component with edit and delete actions
import type { User } from '../types/User';
import { Link } from 'react-router-dom';
import '../styles/UserCard.css';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const UserCard = ({ user, onDelete, isLoading = false }: UserCardProps): JSX.Element => {
  // Handle delete with confirmation
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id);
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(/\s+/)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(user.name);
  const bgColor = `hsl(${user.id * 60}, 70%, 70%)`;

  return (
    <div className="user-row">
      <div className="user-info">
        <div className="avatar" style={{ backgroundColor: bgColor }}>
          {initials}
        </div>
        <div className="user-details">
          <h3>{user.name}</h3>
          <div className="contact-info">
            <span className="email">{user.email}</span>
            <span className="phone">{user.phone}</span>
            {user.username && <span className="username">{user.username}</span>}
          </div>
        </div>
      </div>

      <div className="user-actions">
        <Link to={`/user/${user.id}`} className="action-btn view-btn" title="View details">
          👁️ View
        </Link>
        <Link to={`/user/${user.id}/edit`} className="action-btn edit-btn" title="Edit user">
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="action-btn delete-btn"
          title="Delete user"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};
