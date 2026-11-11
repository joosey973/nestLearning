import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import type { UserType, UserRetType } from '../users/users.types';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/users.entity";


@Injectable()
export class BlockUserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){};

    async blockUser(userId: number): Promise<UserRetType> {
        const res = await this.userRepository.findOneBy({id: userId});
        if (res === null) throw new NotFoundException("Пользователь не найден!");
        if (res.blocked) throw new UnprocessableEntityException("Пользователь уже заблокирован!");
        await this.userRepository.update(userId, {blocked: true});
        
        return {message: `Пользователь с id = ${userId} успешно заблокирован!`}
    }
}