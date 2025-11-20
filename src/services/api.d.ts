import { User, UserFormData } from '../types/User';
export declare const fetchUsers: () => Promise<User[]>;
export declare const fetchUserById: (id: number) => Promise<User>;
export declare const createUser: (userData: UserFormData) => Promise<User>;
export declare const updateUser: (id: number, userData: UserFormData) => Promise<User>;
export declare const deleteUser: (id: number) => Promise<void>;
