import { Module } from '@nestjs/common';
import { AuthDataService } from './auth-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [AuthDataService],
  exports: [AuthDataService],
})
export class AuthDataModule {}
