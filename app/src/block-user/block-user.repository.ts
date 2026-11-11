import { Injectable, NotFoundException } from "@nestjs/common";
import { Pool } from "pg";
import type { UserType, UserRetType } from '../users/users.types';


@Injectable()
export class BlockUserRepository {
    constructor(readonly pool: Pool){};

    async deleteUser(userId: number): Promise<UserRetType> {
        const res = await this.pool.query<UserType>(`delete from users where id=${userId}`)
        if (res.rowCount === 0) throw new NotFoundException("Пользователь не найден!")
        return {message: `Пользователь с id = ${userId} успешно удален!`}
    }
}