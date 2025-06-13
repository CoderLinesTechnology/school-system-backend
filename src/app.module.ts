import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { DocumentModule } from './document/document.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminModule,
    StudentModule,
    TeacherModule,
    DocumentModule,
    AttendanceModule,
    AssessmentsModule,
    NotificationsModule,
  ],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class AppModule {}