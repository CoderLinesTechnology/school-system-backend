import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger('App');

  logAction(userId: number, action: string, details: any) {
    this.logger.log(`User ${userId} performed ${action}: ${JSON.stringify(details)}`);
  }
}