/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppService {
  @EventPattern('order_exchange')
  handleNotification(data: any) {
    console.log(`📩 [Notification] Email sent to ${data.customerEmail}`);
  }
}
