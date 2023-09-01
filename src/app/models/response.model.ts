import { User } from './user.interface';

export interface UsersResponse {
    data: User[];
    limit: number;
    page: number;
    total: number;
}