import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from './entities/users.entity';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const where: { id?: number; name?: string } = {};

    const rawId = req.params.id;
    const rawName = req.params.name;

    if (rawId) {
      where.id = Number(Array.isArray(rawId) ? rawId[0] : rawId);
    } else if (rawName) {
      where.name = Array.isArray(rawName) ? rawName[0] : rawName;
    }

    const users = await this.userRepository.find({ where });

    if (users.length !== 0) {
      for (const user of users) {
        user.lastActivityWithUser = new Date();
        await this.userRepository.save(user);
      }
    }

    next();
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(
      `[${req.method}] / endpoint: '${req.originalUrl}' / IP: ${req.ip}`,
    );
    next();
  }
}