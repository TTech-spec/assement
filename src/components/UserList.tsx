// List component displaying all users
import type { User } from '../types/User';
import { UserCard } from './UserCard';
import '../styles/UserList.css';

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
  isLoading?: boolean;
  error?: string;
}

export const UserList = ({ users, onDelete, isLoading = false, error }: UserListProps) => {
  // Show error message if present
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">❌ Error: {error}</p>
      </div>
    );
  }

  // Show loading skeleton
  if (isLoading && users.length === 0) {
    return (
      <div className="users-list-container">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-row">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-name"></div>
              <div className="skeleton-line skeleton-email"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show empty state
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No users found</p>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};