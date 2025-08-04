/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/notification.consumer.ts
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class NotificationConsumer {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('order.confirmation')
  async handleOrderConfirmation(@Payload() data: any) {
    const { email, orderItems, status } = data;

    const details = `
      Your order has been received:
      ----------------------------
      ${orderItems.map((item) => `- ${item.name}: $${item.price}`).join('\n')}
      Status: ${status}
    `;

    await this.emailService.sendOrderConfirmation(email, details);
  }
}
