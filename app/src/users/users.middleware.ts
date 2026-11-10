import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import type { UserType } from './users.types';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(readonly pool: Pool){};

  async use(req: any, res: any, next: () => void) {
    let partOfQueryRequest = "";
    if (req.params.id) {
      partOfQueryRequest = ` where id=${req.params.id}`;
    } else if (req.params.name) {
      partOfQueryRequest = ` where name='${req.params.name}'`;
    } else {
      partOfQueryRequest = "";
    }
    const result = await this.pool.query<UserType>(`select id, name, lastActivityWithUser from users${partOfQueryRequest}`);
    const users = result.rows.map((usr) => ({id: usr.id, userName: usr.name, lastActivity: usr.lastactivitywithuser}));
    if (users.length !== 0) {
      for (let k = 0; k < users.length; k++) {
        await this.pool.query<UserType>(`update users set lastActivityWithUser=NOW() where id=${users[k].id}`)
      }
    }
    next();
  }
}


@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  async use(req: any, res: any, next: () => void) {
    console.log(`[${req.method}] / endpoint: '${req.originalUrl}' / IP: ${req.ip}`)
    next();
  }
}
