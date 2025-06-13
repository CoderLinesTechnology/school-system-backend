import { IsString, IsEmail } from 'class-validator';

export class CreateParentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}