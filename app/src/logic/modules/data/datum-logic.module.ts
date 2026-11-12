import { Module } from "@nestjs/common";
import { DatumLogicService } from "./datum-logic.service";
import { DatumDataModule } from "../../../data/modules/data/datum-data.module";
import { AuthDataModule } from "../../../data/modules/auth/auth-data.module";

@Module({
    imports: [DatumDataModule, AuthDataModule],
    providers: [DatumLogicService],
    exports: [DatumLogicService],
})
export class DatumLogicModule {};