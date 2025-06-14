import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ParentService } from './parent.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/parent')
@UseGuards(AuthGuard)
export class ParentController {
  constructor(private parentService: ParentService) {}

  @Get('profile')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['parent'])
  async getProfile(@Request() req) {
    return this.parentService.getProfile(req.user);
  }

  @Get('children')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['parent'])
  async getChildren(@Request() req) {
    return this.parentService.getChildren(req.user);
  }

  @Get('children/:id/assessments')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['parent'])
  async getChildAssessments(@Param('id') studentId: string, @Request() req) {
    return this.parentService.getChildAssessments(studentId, req.user);
  }

  @Get('children/:id/documents')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['parent'])
  async getChildDocuments(@Param('id') studentId: string, @Request() req) {
    return this.parentService.getChildDocuments(studentId, req.user);
  }

  @Get('children/:id/payments')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['parent'])
  async getChildPayments(@Param('id') studentId: string, @Request() req) {
    return this.parentService.getChildPayments(studentId, req.user);
  }
}