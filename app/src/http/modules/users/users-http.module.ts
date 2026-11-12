import { Module } from '@nestjs/common';
import { UsersLogicModule } from '../../../logic/modules/users/users-logic.module';
import { UsersHttpController } from './Controllers/users-http.controller';
import { UsersHttpService } from './services/users-http.service';



@Module({
    imports: [UsersLogicModule],
    controllers: [UsersHttpController],
    providers: [UsersHttpService],
})
export class UsersHttpModule {}