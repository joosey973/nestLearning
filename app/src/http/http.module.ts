import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { LoggerMiddleware } from "./middlewares/request-log.middleware";
import { AuthHttpModule } from "./modules/auth/auth-http.module";
import { DatumHttpModule } from "./modules/data/datum-http.module";
import { UsersHttpModule } from "./modules/users/users-http.module";
import { UsersLogicModule } from "../logic/modules/users/users-logic.module";

@Module({
    imports: [
        AuthHttpModule,
        DatumHttpModule,
        UsersHttpModule,
        UsersLogicModule,
    ],
})
export class HttpModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*")
    }
}