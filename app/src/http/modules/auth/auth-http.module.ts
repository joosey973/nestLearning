import { Module } from '@nestjs/common';
import { AuthLogicModule } from '../../../logic/modules/auth/auth-logic.module';
import { AuthHttpController } from './Controllers/auth-http.controller';
import { AuthHttpService } from './services/auth-http.service';


@Module({
  imports: [AuthLogicModule],
  controllers: [AuthHttpController],
  providers: [AuthHttpService],
})
export class AuthHttpModule {}
