import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { AuthDto } from './dto/auth.dto';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async login(authDto: AuthDto) {
    const { email, password } = authDto;
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid credentials',
        error_code: 'AUTH_401',
      });
    }

    return {
      success: true,
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        user: data.user,
      },
    };
  }

  async register(authDto: AuthDto & { name: string; role: string }) {
    const { email, password, name, role } = authDto;
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
      options: { data: { name, role } },
    });

    if (error) {
      throw new UnauthorizedException({
        success: false,
        message: error.message,
        error_code: 'AUTH_400',
      });
    }

    await this.supabaseService.client.from('users').insert({
      id: data.user.id,
      name,
      email,
      role,
    });

    return {
      success: true,
      data: { user: data.user },
    };
  }

  async getProfile(user: User) {
    const { data, error } = await this.supabaseService.client
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      throw new UnauthorizedException({
        success: false,
        message: 'User not found',
        error_code: 'AUTH_404',
      });
    }

    return { success: true, data };
  }

  async logout() {
    const { error } = await this.supabaseService.client.auth.signOut();
    if (error) {
      throw new UnauthorizedException({
        success: false,
        message: 'Logout failed',
        error_code: 'AUTH_400',
      });
    }
    return { success: true };
  }
}