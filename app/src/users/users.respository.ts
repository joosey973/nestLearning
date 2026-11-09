import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { Pool } from "pg";
import type { UserType, UserRetType, UserCType, UserUType } from './users.types';


@Injectable()
export class UsersRepository {
    constructor(readonly pool: Pool){};

    async getAllUsers(): Promise<string[]> {
        const res = await this.pool.query<UserType>("select * from users");
        const allUsers = res.rows.map(user => user.name);
        return allUsers;
    }

    async getUserById(userId: number): Promise<string> {
        const res = await this.pool.query<UserType>(`select id, name from users where id=${userId}`)
        const user = res.rows[0].name;
        
        if (user === undefined) throw new NotFoundException('Пользователь не найден');
        return `Это пользователь ${user}, найденный по id = ${userId}`;
    }

    async getUserByName(name: string): Promise<string> {
        const res = await this.pool.query<UserType>(`select id, name from users where name='${name}'`)
        const users = res.rows.map(user => `Найден пользователь ${name} c id = ${user.id}`);
        const usersString = users.join("\n");
        if (!usersString) throw new NotFoundException("Не найдены пользователи с таким именем!");
        return usersString;
    }

    async createUser(body: UserCType): Promise<UserRetType> {
        const name = body.name;
        const password = body.password;
        if (!password) throw new BadRequestException("Не указан пароль");
        if (!name) throw new BadRequestException("Не указано имя");
        if (/\d/.test(name)) throw new BadRequestException("Неверно указано имя! (Не должно содержаться цифр)");

        await this.pool.query<UserType>(`insert into users (name, password) values ('${name}', '${password}')`)
        return {message: `Пользователь ${name} успешно создан!`}
    }

    async updateUser(userId: number, body: UserUType): Promise<UserRetType> {
        if (!body.name) throw new BadRequestException("Не указано поле для изменения!");
        const res = await this.pool.query<UserType>(`update users set name='${body.name}' where id=${userId}`)
        if (res.rowCount === 0) throw new NotFoundException("Пользователь не найден!");
        return {message: `Пользователь с id = ${userId} успешно обновлен!`}
    }

    async deleteUser(userId: number): Promise<UserRetType> {
        const res = await this.pool.query<UserType>(`delete from users where id=${userId}`)
        if (res.rowCount === 0) throw new NotFoundException("Пользователь не найден!")
        return {message: `Пользователь с id = ${userId} успешно удален!`}
    }
}