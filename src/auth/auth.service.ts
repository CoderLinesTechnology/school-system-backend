import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .insert({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }

    const payload = { sub: data.id, email: data.email, role: data.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: data,
    };
  }

  async login(dto: LoginDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .select()
      .eq('email', dto.email)
      .single();

    if (error || !data) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, data.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: data.id, email: data.email, role: data.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: data,
    };
  }

  async getProfile(userId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .select('id, name, email, role')
      .eq('id', userId)
      .single();

    if (error || !data) {
      throw new UnauthorizedException('User not found');
    }

    return data;
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }
}