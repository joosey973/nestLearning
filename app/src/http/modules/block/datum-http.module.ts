import { Module } from '@nestjs/common';
import { BlockUserLogicModule } from '../../../logic/modules/block/block-users-logic.module';
import { BlockUserHttpController } from './Controllers/block-user.controller';
import { BlockUsersHttpService } from './services/block-user.service';



@Module({
    imports: [BlockUserLogicModule],
    controllers: [BlockUserHttpController],
    providers: [BlockUsersHttpService],
})
export class BlockUsersHttpModule {}