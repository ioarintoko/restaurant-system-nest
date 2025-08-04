import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(@Body() body: { customerEmail: string; items: any[] }) {
    const order = await this.orderService.create(body);
    return { orderId: order.id, status: order.status };
  }

  @Get(':id/status')
  async getStatus(@Param('id') id: number) {
    const order = await this.orderService.findStatusById(id);
    if (!order) return { message: 'Order not found' };
    return { status: order.status };
  }
}
