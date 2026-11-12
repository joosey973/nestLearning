import { Module } from "@nestjs/common";
import { BlockUserDataModule } from "../../../data/modules/block/block-user-data.module";
import { BlockUsersLogicService } from "./block-users-logic.service";
import { UsersDataModule } from "../../../data/modules/users/users-data.module";

@Module({
    imports: [BlockUserDataModule, UsersDataModule],
    providers: [BlockUsersLogicService],
    exports: [BlockUsersLogicService],
})
export class BlockUserLogicModule {};