import type { User } from '../types/User';
import '../styles/UserCard.css';
interface UserCardProps {
    user: User;
    onDelete: (id: number) => void;
    isLoading?: boolean;
}
export declare const UserCard: ({ user, onDelete, isLoading }: UserCardProps) => JSX.Element;
export {};
