import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.respository';
import { UsersService } from './users.service';
import { Pool } from "pg";
import { UsersMiddleware, LoggerMiddleware } from './users.middleware';

@Module({
    controllers: [UsersController],
    providers: [UsersRepository, UsersService,
        {
            provide: Pool,
            useFactory: () => {
                return new Pool({
                    host: "localhost",
                    user: "myuser",
                    password: "mypassword",
                    database: "app",
                })
            }
        },
    ],
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UsersMiddleware).forRoutes(
            { path: 'users/:id', method: RequestMethod.GET },
            { path: 'users/by-name/:name', method: RequestMethod.GET },
            { path: 'users', method: RequestMethod.GET },
            { path: 'users/:id', method: RequestMethod.PATCH },
        )

        consumer.apply(LoggerMiddleware).forRoutes("*")
    }
}
