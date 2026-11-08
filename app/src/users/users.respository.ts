import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = new Map<number, {name: string, password: string}>();
    private count = 1;

    getAllUsers(): string[] {
        const names: string[] = [];
        for (let i = 0; i < this.count; i++) {
            const name = this.users.get(i)?.name;
            if (name !== undefined) {
                names.push(name);
            }
        }
        return names;
    }

    getUserById(userId: number): string {
        const user = this.users.get(userId)?.name;
        if (user === undefined) throw new NotFoundException('Пользователь не найден');
        return `Это пользователь ${user}, найденный по id = ${userId}`;
    }

    getUserByName(name: string): string {
        let resString: string = '';
        for (const [id, userName] of this.users) {
            if (userName.name === name) {
                resString += `Найден пользователь ${name} c id = ${id}\n`;
            }
        }

        if (!resString) {
            throw new NotFoundException("Не найдены пользователи с таким именем!");
        }

        return resString;
    }

    createUser(body: any) {
        let name = body.name;
        let password = body.password;
        if (!password) throw new BadRequestException("Не указан пароль");
        if (!name) throw new BadRequestException("Не указано имя")
        if (/\d/.test(name)) throw new BadRequestException("Неверно указано имя! (Не должно содержаться цифр)");
        this.users.set(this.count++, {"name": name, "password": password});
        return {message: `Пользователь ${name} успешно создан!`}
    }

    updateUser(userId: number, body: any) {
        if (!body.name) throw new BadRequestException("Не указано поле для изменения!");
        let user = this.users.get(userId);
        if (!user) throw new NotFoundException("Пользователь не найден!");
        user.name = body.name;
        return {message: `Пользователь с id = ${userId} успешно обновлен!`}
    }

    deleteUser(userId: number) {
        if (!userId) throw new NotFoundException("Пользователь не найден!");
        this.users.delete(userId);
        return {message: `Пользователь с id = ${userId} успешно удален!`}
    }
}