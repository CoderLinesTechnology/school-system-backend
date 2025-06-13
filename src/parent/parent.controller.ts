import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ParentService } from './parent.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../types/user.types'; // Updated import
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/parent')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PARENT)
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.parentService.getProfile(req.user.sub);
  }

  @Get('children')
  async getChildren(@Request() req) {
    return this.parentService.getChildren(req.user.sub);
  }

  @Get('children/:id/assessments')
  async getChildAssessments(@Param('id') studentId: string, @Request() req) {
    return this.parentService.getChildAssessments(+studentId, req.user.sub);
  }

  @Get('children/:id/documents')
  async getChildDocuments(@Param('id') studentId: string, @Request() req) {
    return this.parentService.getChildDocuments(+studentId, req.user.sub);
  }

  @Get('children/:id/payments')
  async getChildPayments(@Param('id') studentId: string, @Request() req) {
    return this.parentService.getChildPayments(+studentId, req.user.sub);
  }
}