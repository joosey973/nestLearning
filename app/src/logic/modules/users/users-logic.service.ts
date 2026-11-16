import { BadRequestException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { UsersDataService } from "../../../data/modules/users/users-data.service";
import { User } from "../../../data/modules/users/entities/users.entity";

@Injectable()
export class UsersLogicService {
    constructor(@Inject(UsersDataService) private readonly usersDataService: UsersDataService) { };

    async checkCorrectName(name?: string): Promise<boolean> {
        if (name && /\d/.test(name)) throw new BadRequestException("Неверно указано имя! (Не должно содержаться цифр)");
        return true;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.usersDataService.getAllUsers();
    }

    async getUserById(userId: number): Promise<User | null> {
        const user = await this.usersDataService.getUserById(userId);
        if (user === null) throw new NotFoundException('Пользователь не найден');
        return user;
    }

    async getUserByName(name: string): Promise<User[]> {
        const users = await this.usersDataService.getUsersByName(name);
        if (users.length === 0) throw new NotFoundException("Не найдены пользователи с таким именем!");
        return users;
    }

    async create(data: Partial<User>): Promise<User> {
        await this.checkCorrectName(data.name);
        return await this.usersDataService.create(data);
    }

    async update(id: number, data: Partial<User>): Promise<boolean> {
        await this.checkCorrectName(data.name);
        const affected = this.usersDataService.update(id, data);
        if (!affected) throw new NotFoundException("Пользователь не найден!");
        return affected;
    }

    async delete(id: number): Promise<boolean> {
        const affected = this.usersDataService.delete(id);
        if (!affected) throw new NotFoundException("Пользователь не найден!");
        return affected;
    }

    async block(userId: number): Promise<boolean> {
        const res = await this.usersDataService.getUserById(userId);
        if (res === null) throw new NotFoundException("Пользователь не найден!");
        if (res.blocked) throw new UnprocessableEntityException("Пользователь уже заблокирован!");
        return await this.usersDataService.block(userId);
    }
}