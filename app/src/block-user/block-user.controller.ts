import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { BlockUserService } from './block-user.service';
import { UserRetType } from '../users/users.types';


@Controller('users/block-user')
export class BlockUserController {
    constructor(private readonly blockUserService: BlockUserService){};

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<UserRetType> {
        return this.blockUserService.deleteUser(userId);
    }
}
