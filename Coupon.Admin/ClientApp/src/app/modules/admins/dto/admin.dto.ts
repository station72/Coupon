import { UserRole } from "../../../shared/data/user/user-roles";

export interface AdminDto{
    id: string,
    email: string,
    name: string,
    login: string,
    role: UserRole,
    isBlocked: boolean
}