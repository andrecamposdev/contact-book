import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

  @IsString()
  public telephone: string;

  @IsOptional()
  public birthday: Date;

  @IsString()
  public address: string;

  @IsEmail()
  public email: string;

  @IsNumber()
  public user_id: number;
}
