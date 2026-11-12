import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { LoggerMiddleware } from "./middlewares/request-log.middleware";
import { UsersMiddleware } from "./middlewares/update-last-activity-with-user.middleware";
import { AuthHttpModule } from "./modules/auth/auth-http.module";
import { BlockUsersHttpModule } from "./modules/block/datum-http.module";
import { DatumHttpModule } from "./modules/data/datum-http.module";
import { UsersHttpModule } from "./modules/users/users-http.module";
import { UsersLogicModule } from "../logic/modules/users/users-logic.module";

@Module({
    imports: [
        AuthHttpModule,
        BlockUsersHttpModule,
        DatumHttpModule,
        UsersHttpModule,
        UsersLogicModule,
    ],
})
export class HttpModule {
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