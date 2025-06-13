import { DataSource } from 'typeorm';
       import { ConfigService } from '@nestjs/config';

       const configService = new ConfigService();

       export const AppDataSource = new DataSource({
         type: 'postgres',
         host: configService.get<string>('DATABASE_HOST'),
         port: configService.get<number>('DATABASE_PORT', 5432),
         username: configService.get<string>('DATABASE_USER'),
         password: configService.get<string>('DATABASE_PASSWORD'),
         database: configService.get<string>('DATABASE_NAME'),
         entities: ['src/entities/*.entity{.ts,.js}'],
         migrations: ['src/migrations/*{.ts,.js}'],
         synchronize: false,
       });