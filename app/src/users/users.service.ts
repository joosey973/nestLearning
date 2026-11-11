import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import type { UserType, UserRetType, UserCType, UserUType } from './users.types';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(userId: number): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (user === null) throw new NotFoundException('Пользователь не найден');
        return user;
    }

    async getUserByName(name: string): Promise<User[]> {
        const users = await this.userRepository.find({ where: { name } });
        if (users.length === 0) throw new NotFoundException("Не найдены пользователи с таким именем!");
        return users;
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserRetType> {
        const email = createUserDto.email;
        const name = createUserDto.name;
        const password = createUserDto.password;
        if (!email) throw new BadRequestException("Не указана почта");
        if (!name) throw new BadRequestException("Не указано имя");
        if (!password) throw new BadRequestException("Не указан пароль");
        if (/\d/.test(name)) throw new BadRequestException("Неверно указано имя! (Не должно содержаться цифр)");

        const newUser = this.userRepository.create({ email, name, password });
        await this.userRepository.save(newUser);

        return { message: `Пользователь ${name} успешно создан!` };
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserRetType> {
        if (/\d/.test(updateUserDto.name)) throw new BadRequestException("Неверно указано имя! (Не должно содержаться цифр)");
        const res = await this.userRepository.update(userId, updateUserDto);
        if (res.affected === 0) {
            throw new NotFoundException('Пользователь не найден!');
        }
        return { message: `Пользователь с id = ${userId} успешно обновлен!` };
    }

    async deleteUser(userId: number): Promise<UserRetType> {
        const res = await this.userRepository.delete({ id: userId });
        if (!res.affected) throw new NotFoundException("Пользователь не найден!");

        return { message: `Пользователь с id = ${userId} успешно удален!` };
    }
}