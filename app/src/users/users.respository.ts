import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = new Map<number, string>();
    private count = 1;

    getAllUsers(): string[] {
        const names: string[] = [];
        for (let i = 0; i < this.count; i++) {
            const name = this.users.get(i);
            if (name !== undefined) {
                names.push(name);
            }
        }
        return names;
    }

    getUserById(userId: number): string {
        const user = this.users.get(userId);
        if (user === undefined) throw new NotFoundException('Нет такого пользователя');
        return `Это пользователь ${user}, найденный по id = ${userId}`;
    }

    getUserByName(name: string): string {
        let resString: string = '';
        for (const [id, userName] of this.users) {
            if (userName === name) {
                resString += `Найден пользователь ${name} c id = ${id}\n`;
            }
        }

        if (!resString) {
            throw new NotFoundException("Не найдены пользователи с таким именем!");
        }

        return resString;
    }

    createUser(name: string) {
        if (/\d/.test(name)) return {message: "Неверно указано имя! (Не должно содержаться цифр)"}
        this.users.set(this.count++, name);
        return {message: `Пользователь ${name} успешно создан!`, name: name, id: this.count - 1}
    }
}