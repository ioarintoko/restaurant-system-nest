import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('order.confirmation')
  async handleOrderConfirmation(@Payload() data: any) {
    console.log('📩 Received order.confirmation message:', data);
    await this.notificationService.sendOrderEmail(data);
  }
}
