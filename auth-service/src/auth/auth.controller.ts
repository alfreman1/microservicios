import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  name: string;
  email: string;
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(
        loginDto.email,
        loginDto.password
      );
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || "Error al iniciar sesión",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(
        registerDto.name,
        registerDto.email,
        registerDto.password
      );
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || "Error al registrarse",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
