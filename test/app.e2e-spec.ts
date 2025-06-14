import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
 let app: INestApplication;

 beforeEach(async () => {
   const moduleFixture: TestingModule = await Test.createTestingModule({
     imports: [AppModule],
   }).compile();

   app = moduleFixture.createNestApplication();
   await app.init();
 });

 afterEach(async () => {
   await app.close();
 });

 it('/api/auth/me (GET) should return 401 without token', () => {
   return request(app.getHttpServer())
     .get('/api/auth/me')
     .expect(401)
     .expect({
       success: false,
       message: 'No token provided',
       error_code: 'AUTH_401',
     });
 });
});