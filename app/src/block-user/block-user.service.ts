import { Injectable } from '@nestjs/common';
import { BlockUserRepository } from './block-user.repository';
import { UserRetType } from '../users/users.types';

@Injectable()
export class BlockUserService {
    constructor(readonly blockUserRepository: BlockUserRepository){};

    deleteUser(userId: number): Promise<UserRetType> {
            return this.blockUserRepository.deleteUser(userId);
    }
}
