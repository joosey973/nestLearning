import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { User } from '../users/entities/users.entity';
import { Datum } from './entities/datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Datum, Auth, User])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
