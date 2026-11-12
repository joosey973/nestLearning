import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/users.entity";
import { BlockUserDataService } from "./block-user-data.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [BlockUserDataService],
    exports: [BlockUserDataService],
})
export class BlockUserDataModule {};