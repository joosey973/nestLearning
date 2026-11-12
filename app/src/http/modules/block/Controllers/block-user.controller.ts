import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { BlockUsersHttpService } from '../services/block-user.service';
import { User } from '../../../../data/modules/users/entities/users.entity';



@Controller('block-user')
export class BlockUserHttpController {
    constructor(private readonly blockUserHttpService: BlockUsersHttpService){};

    @Patch(':id')
    async blockUser(@Param('id', ParseIntPipe) userId: number): Promise<boolean> {
        return await this.blockUserHttpService.block(userId);
    }
}
