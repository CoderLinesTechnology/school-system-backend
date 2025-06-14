import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('send')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin', 'teacher'])
  async sendNotification(@Body() dto: SendNotificationDto, @Request() req) {
    return this.notificationService.sendNotification(dto, req.user);
  }
}