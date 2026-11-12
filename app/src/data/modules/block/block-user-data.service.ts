import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class BlockUserDataService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { };

    async block(userId: number): Promise<boolean> {
        const res = await this.usersRepository.update(userId, {blocked: true});
        return (res.affected ?? 0) > 0;
    }

}