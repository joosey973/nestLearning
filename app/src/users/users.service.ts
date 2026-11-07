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

    createUser(name: string) { 
        return this.usersRepsitory.createUser(name);
    }
}
