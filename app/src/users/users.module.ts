import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersMiddleware, LoggerMiddleware } from './users.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
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
