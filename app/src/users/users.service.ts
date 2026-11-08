import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.respository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepsitory: UsersRepository){};

    getAllUsers(): string[] {
        return this.usersRepsitory.getAllUsers();
    }

    getUserById(userId: number): string {
        return this.usersRepsitory.getUserById(userId)
    }

    getUserByName(name: string): string {
        return this.usersRepsitory.getUserByName(name);
    }

    createUser(body: any) { 
        return this.usersRepsitory.createUser(body);
    }

    updateUser(userId: number, body: any) {
        return this.usersRepsitory.updateUser(userId, body);
    }

    deleteUser(userId: number) {
        return this.usersRepsitory.deleteUser(userId);
    }
}
