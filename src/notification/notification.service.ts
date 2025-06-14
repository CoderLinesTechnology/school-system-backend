import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class NotificationService {
  constructor(
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {}

  async sendNotification(dto: SendNotificationDto, user: User) {
    if (!['school_admin', 'teacher'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    // Simulate sending notification (e.g., email or push)
    // In production, use EMAIL_SERVICE_API
    console.log(`Sending notification to ${dto.recipientId}: ${dto.message}`);

    return { success: true, data: { message: 'Notification sent' } };
  }
}