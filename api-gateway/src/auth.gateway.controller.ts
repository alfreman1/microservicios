import { Body, Controller, Post } from '@nestjs/common';
import { HttpClientService } from './common/http-client.service';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly http: HttpClientService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.http.request({
      method: 'POST',
      url: `${process.env.AUTH_BASE_URL}/auth/login`,
      data: body,
      headers: { 'content-type': 'application/json' },
    });
  }

  @Post('register')
  register(@Body() body: any) {
    return this.http.request({
      method: 'POST',
      url: `${process.env.AUTH_BASE_URL}/auth/register`,
      data: body,
      headers: { 'content-type': 'application/json' },
    });
  }
}
