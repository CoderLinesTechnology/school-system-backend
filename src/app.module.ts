import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    import { AuthModule } from './auth/auth.module';
    import { SupabaseService } from './supabase/supabase.service';

    @Module({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
      ],
      providers: [SupabaseService],
      exports: [SupabaseService],
    })
    export class AppModule {}