import type { User } from '../types/User';
import '../styles/UserList.css';
interface UserListProps {
    users: User[];
    onDelete: (id: number) => void;
    isLoading?: boolean;
    error?: string;
}
export declare const UserList: ({ users, onDelete, isLoading, error }: UserListProps) => import("react/jsx-runtime").JSX.Element;
export {};
