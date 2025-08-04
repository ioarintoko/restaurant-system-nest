import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppService {
  @EventPattern('order_exchange') // karena pakai fanout exchange
  handleOrderMessage(data: any) {
    console.log('🍳 [Kitchen] Order received:', data);
    // Simulasi proses dapur, nanti bisa update status via API
  }
}
