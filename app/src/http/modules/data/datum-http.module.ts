import { Module } from '@nestjs/common';
import { DatumLogicModule } from '../../../logic/modules/data/datum-logic.module';
import { DatumHttpController } from './Controllers/datum-http.controller';
import { DatumHttpService } from './services/datum-logic.service';



@Module({
    imports: [DatumLogicModule],
    controllers: [DatumHttpController],
    providers: [DatumHttpService],
})
export class DatumHttpModule {}