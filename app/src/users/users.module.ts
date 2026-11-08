import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.respository';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersRepository, UsersService],
})
export class UsersModule {}
