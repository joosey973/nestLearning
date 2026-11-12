import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { UsersDataService } from "../../../data/modules/users/users-data.service";
import { BlockUserDataService } from "../../../data/modules/block/block-user-data.service";

@Injectable()
export class BlockUsersLogicService {
    constructor(
        @Inject(BlockUserDataService) private readonly blockUserDataService: BlockUserDataService,
        @Inject(UsersDataService) private readonly usersDataService: UsersDataService,
    ) { };

    async block(userId: number): Promise<boolean> {
        const res = await this.usersDataService.getUserById(userId);
        if (res === null) throw new NotFoundException("Пользователь не найден!");
        if (res.blocked) throw new UnprocessableEntityException("Пользователь уже заблокирован!");
        return await this.blockUserDataService.block(userId);
    }
}