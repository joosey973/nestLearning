import { Module } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersDataService],
    exports: [UsersDataService],
})
export class UsersDataModule {}
