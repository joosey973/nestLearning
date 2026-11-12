import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../data/modules/users/entities/users.entity';
import { UsersLogicService } from '../../logic/modules/users/users-logic.service';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
    constructor(@Inject(UsersLogicService) private readonly usersLogicService: UsersLogicService) { }

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        const where: { id?: number; name?: string } = {};

        const rawId = req.params.id;
        const rawName = req.params.name;

        const id = rawId ? Number(rawId) : undefined;

        const name = rawName
            ? Array.isArray(rawName) ? rawName[0] : rawName
            : undefined;

        await this.usersLogicService.updateLastActivity(id, name);

        next();
    }
}