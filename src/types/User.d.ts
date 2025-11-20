export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    website?: string;
}
export interface UserFormData {
    name: string;
    email: string;
    phone: string;
    username: string;
}
