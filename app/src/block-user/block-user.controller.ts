import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { BlockUserService } from './block-user.service';
import { UserRetType } from '../users/users.types';


@Controller('block-user')
export class BlockUserController {
    constructor(private readonly blockUserService: BlockUserService){};

    @Patch(':id')
    blockUser(@Param('id', ParseIntPipe) userId: number): Promise<UserRetType> {
        return this.blockUserService.blockUser(userId);
    }
}
