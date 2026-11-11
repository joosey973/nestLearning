import { Module } from '@nestjs/common';
import { BlockUserController } from './block-user.controller';
import { BlockUserService } from './block-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [BlockUserController],
    providers: [BlockUserService],
})
export class BlockUserModule {

}
