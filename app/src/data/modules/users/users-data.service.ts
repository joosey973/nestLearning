import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersDataService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { };

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ email: email });
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.usersRepository.findOneBy({ id: id });
    }

    async getUsersByName(name: string): Promise<User[]> {
        return await this.usersRepository.findBy({ name: name });
    }

    async create(data: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }

    async update(id: number, data: Partial<User>): Promise<boolean> {
        const result = await this.usersRepository.update(id, data);
        return (result.affected ?? 0) > 0;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.usersRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    async block(userId: number): Promise<boolean> {
        const res = await this.usersRepository.update(userId, {blocked: true});
        return (res.affected ?? 0) > 0;
    }
}