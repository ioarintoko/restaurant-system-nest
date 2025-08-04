/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587,
    auth: {
      user: process.env.MAIL_USER || 'your_mailtrap_user',
      pass: process.env.MAIL_PASS || 'your_mailtrap_pass',
    },
  });

  async sendOrderConfirmation(to: string, orderDetails: string) {
    const info = await this.transporter.sendMail({
      from: '"Restaurant App" <noreply@restaurant.com>',
      to,
      subject: 'Order Confirmation',
      text: orderDetails,
    });

    console.log('📨 Email sent: %s', info.messageId);
  }
}
