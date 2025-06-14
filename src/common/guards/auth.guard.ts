import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Request } from 'express';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({
        success: false,
        message: 'No token provided',
        error_code: 'AUTH_401',
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data, error } = await this.supabaseService.client.auth.getUser(token);

    if (error) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid token',
        error_code: 'AUTH_401',
      });
    }

    // Validate and transform Supabase User to match custom User interface
    const supabaseUser = data.user;
    if (!supabaseUser.user_metadata || !supabaseUser.user_metadata.role) {
      throw new UnauthorizedException({
        success: false,
        message: 'User metadata incomplete',
        error_code: 'AUTH_401',
      });
    }

    const user: User = {
      id: supabaseUser.id,
      user_metadata: {
        name: supabaseUser.user_metadata.name || '',
        email: supabaseUser.user_metadata.email || supabaseUser.email || '',
        role: supabaseUser.user_metadata.role,
        ...supabaseUser.user_metadata,
      },
    };

    request.user = user;
    return true;
  }
}