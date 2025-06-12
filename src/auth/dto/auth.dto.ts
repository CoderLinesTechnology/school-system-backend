export class RegisterDto {
  name: string;
  email: string;
  password: string;
  role: string;
  schoolId?: string;
}

export class LoginDto {
  email: string;
  password: string;
}