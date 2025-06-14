import { Request } from 'express';
import { User } from './user.interface';

declare module 'express' {
  interface Request {
    user?: User;
  }
}