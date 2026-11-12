import { Module } from "@nestjs/common";
import { UsersLogicService } from "./users-logic.service";
import { UsersDataModule } from "../../../data/modules/users/users-data.module";

@Module({
    imports: [UsersDataModule],
    providers: [UsersLogicService],
    exports: [UsersLogicService],
})
export class UsersLogicModule {};