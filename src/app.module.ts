import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { DocumentModule } from './document/document.module';
import { PaymentsModule } from './payments/payments.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ParentModule } from './parent/parent.module';
import { AttendanceModule } from './attendance/attendance.module';
import { User } from './entities/user.entity';
import { School } from './entities/school.entity';
import { SchoolAdmin } from './entities/school-admin.entity';
import { Teacher } from './entities/teacher.entity';
import { Class } from './entities/class.entity';
import { Student } from './entities/student.entity';
import { Parent } from './entities/parent.entity';
import { ParentStudent } from './entities/parent-student.entity';
import { Subject } from './entities/subject.entity';
import { Assessment } from './entities/assessment.entity';
import { Document } from './entities/document.entity';
import { Payment } from './entities/payment.entity';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          User,
          School,
          SchoolAdmin,
          Teacher,
          Class,
          Student,
          Parent,
          ParentStudent,
          Subject,
          Assessment,
          Document,
          Payment,
          Attendance,
        ],
        synchronize: false, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AdminModule,
    TeacherModule,
    StudentModule,
    DocumentModule,
    PaymentsModule,
    AssessmentsModule,
    NotificationsModule,
    ParentModule,
    AttendanceModule,
  ],
})
export class AppModule {}