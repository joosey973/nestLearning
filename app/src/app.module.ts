import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockUserController } from './block-user/block-user.controller';
import { BlockUserService } from './block-user/block-user.service';
import { BlockUserModule } from './block-user/block-user.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'app',
    }),
    UsersModule,
    BlockUserModule,
  ],
})
export class AppModule {}
