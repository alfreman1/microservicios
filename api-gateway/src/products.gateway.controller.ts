import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HttpClientService } from './common/http-client.service';

@Controller('products')
export class ProductsGatewayController {
  constructor(private readonly http: HttpClientService) {}

  @Post()
  create(@Body() body: any) {
    return this.http.request({
      method: 'POST',
      url: `${process.env.PRODUCTS_BASE_URL}/products`,
      data: body,
    });
  }

  @Get()
  findAll() {
    return this.http.request({
      method: 'GET',
      url: `${process.env.PRODUCTS_BASE_URL}/products`,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.http.request({
      method: 'GET',
      url: `${process.env.PRODUCTS_BASE_URL}/products/${id}`,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.http.request({
      method: 'PATCH',
      url: `${process.env.PRODUCTS_BASE_URL}/products/${id}`,
      data: body,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.http.request({
      method: 'DELETE',
      url: `${process.env.PRODUCTS_BASE_URL}/products/${id}`,
    });
  }
}
