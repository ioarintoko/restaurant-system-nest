/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: '7a202ffb993bb1',
      pass: 'your_password_here', // ganti dengan password asli
    },
  });

  async sendOrderEmail(order: any) {
    const mailOptions = {
      from: '"Restaurant App" <no-reply@restaurant.com>',
      to: order.email, // email customer dari payload
      subject: `Order Confirmation - ID ${order.id}`,
      // eslint-disable-next-line prettier/prettier
      text: `Hi, your order with ID ${order.id} is received.\n\nItems:\n${order.items.map(i => `- ${i.name} (${i.price})`).join('\n')}\n\nStatus: ${order.status}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent to:', order.email);
    } catch (error) {
      console.error('❌ Failed to send email:', error);
    }
  }
}
