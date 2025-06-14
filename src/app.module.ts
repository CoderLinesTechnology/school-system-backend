import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SchoolAdminModule } from './school-admin/school-admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { DocumentModule } from './document/document.module';
import { PaymentModule } from './payment/payment.module';
import { AssessmentModule } from './assessment/assessment.module';
import { NotificationModule } from './notification/notification.module';
import { ParentModule } from './parent/parent.module';
import { AttendanceModule } from './attendance/attendance.module';
import { SupabaseService } from './common/supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SchoolAdminModule,
    TeacherModule,
    StudentModule,
    DocumentModule,
    PaymentModule,
    AssessmentModule,
    NotificationModule,
    ParentModule,
    AttendanceModule,
  ],
  providers: [SupabaseService],
})
export class AppModule {}