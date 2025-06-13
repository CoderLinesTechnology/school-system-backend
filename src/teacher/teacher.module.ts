import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(pdf|doc|docx)$/)) {
          cb(new Error('Only PDF and Word files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  ],
  providers: [TeacherService, SupabaseService],
  controllers: [TeacherController],
})
export class TeacherModule {}