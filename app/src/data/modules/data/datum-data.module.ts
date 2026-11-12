import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datum } from './entities/datum.entity';
import { DatumDataService } from './datum-data.service';



@Module({
  imports: [TypeOrmModule.forFeature([Datum])],
  providers: [DatumDataService],
  exports: [DatumDataService],
})
export class DatumDataModule {}
