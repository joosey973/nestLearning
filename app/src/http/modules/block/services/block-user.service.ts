import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { BlockUsersLogicService } from "../../../../logic/modules/block/block-users-logic.service";

@Injectable()
export class BlockUsersHttpService {
    constructor(
        @Inject(BlockUsersLogicService) private readonly blockUserLogicService: BlockUsersLogicService,
    ) { };

    async block(userId: number): Promise<boolean> {
        return this.blockUserLogicService.block(userId);
    }
}