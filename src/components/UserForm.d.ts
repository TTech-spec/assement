import { User, UserFormData } from '../types/User';
import '../styles/UserForm.css';
interface UserFormProps {
    onSubmit: (userData: UserFormData) => void;
    initialData?: User;
    isLoading?: boolean;
    isEditing?: boolean;
}
export declare const UserForm: ({ onSubmit, initialData, isLoading, isEditing }: UserFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
