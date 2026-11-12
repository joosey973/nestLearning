import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from './http/http.module';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'app',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
