import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { User } from '../auth/entities/user.entity';
import { Document } from '../document/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([School, User, Document]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}