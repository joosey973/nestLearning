import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.respository';
import type { UserRetType, UserCType, UserUType } from './users.types';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepsitory: UsersRepository){};

    getAllUsers(): Promise<string[]> {
        return this.usersRepsitory.getAllUsers();
    }

    getUserById(userId: number): Promise<string> {
        return this.usersRepsitory.getUserById(userId)
    }

    getUserByName(name: string): Promise<string> {
        return this.usersRepsitory.getUserByName(name);
    }

    createUser(body: UserCType): Promise<UserRetType> { 
        return this.usersRepsitory.createUser(body);
    }

    updateUser(userId: number, body: UserUType): Promise<UserRetType> {
        return this.usersRepsitory.updateUser(userId, body);
    }

    deleteUser(userId: number): Promise<UserRetType> {
        return this.usersRepsitory.deleteUser(userId);
    }
}
