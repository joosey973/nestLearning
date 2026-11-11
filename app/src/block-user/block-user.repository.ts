import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Pool } from "pg";
import type { UserType, UserRetType } from '../users/users.types';


@Injectable()
export class BlockUserRepository {
    constructor(readonly pool: Pool){};

    async blockUser(userId: number): Promise<UserRetType> {
        const result = await this.pool.query<UserType>(`select blocked from users where id=${userId}`)
        if (result.rowCount === 0) throw new NotFoundException("Пользователь не найден!");
        if (result.rows[0].blocked) throw new UnprocessableEntityException("Пользователь уже заблокирован!");

        const res = await this.pool.query<UserType>(`update users set blocked=true where id=${userId}`)
        return {message: `Пользователь с id = ${userId} успешно заблокирован!`}
    }
}