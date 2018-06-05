import { UserRole } from "./user-roles";

export class UserDto{
    id: string;
    role: UserRole;
    name: string;
}