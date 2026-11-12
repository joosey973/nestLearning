import { Module } from "@nestjs/common";
import { AuthDataModule } from "../../../data/modules/auth/auth-data.module";
import { AuthLogicService } from "./auth-logic.service";
import { UsersDataModule } from "../../../data/modules/users/users-data.module";

@Module({
    imports: [AuthDataModule, UsersDataModule],
    providers: [AuthLogicService],
    exports: [AuthLogicService],
})
export class AuthLogicModule {};