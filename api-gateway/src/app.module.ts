import { Module } from '@nestjs/common';
import { HttpClientService } from './common/http-client.service';
import { AuthGatewayController } from './auth.gateway.controller';
import { ProductsGatewayController } from './products.gateway.controller';

@Module({
  controllers: [AuthGatewayController, ProductsGatewayController],
  providers: [HttpClientService],
})
export class AppModule {}
