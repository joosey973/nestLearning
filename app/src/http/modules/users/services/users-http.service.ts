import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../../../data/modules/users/entities/users.entity";
import { UsersLogicService } from "../../../../logic/modules/users/users-logic.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersHttpService {
    constructor(@Inject(UsersLogicService) private readonly usersLogicService: UsersLogicService) { };

    async getAllUsers(): Promise<User[]> {
        return await this.usersLogicService.getAllUsers();
    }

    async getUserById(userId: number): Promise<User | null> {
        return await this.usersLogicService.getUserById(userId);
    }

    async getUserByName(name: string): Promise<User[]> {
        return await this.usersLogicService.getUserByName(name);
    }

    async create(dto: CreateUserDto): Promise<User> {
        return await this.usersLogicService.create(dto);
    }

    async update(id: number, dto: UpdateUserDto): Promise<boolean> {
        return await this.usersLogicService.update(id, dto);
    }

    async delete(id: number): Promise<boolean> {
        return await this.usersLogicService.delete(id);
    }
}