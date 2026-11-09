import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.respository';
import { UsersService } from './users.service';
import { Pool } from "pg";

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
export class UsersModule {}
