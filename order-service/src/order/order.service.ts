/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel } from 'amqplib';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService implements OnModuleInit {
  private channel: Channel;

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const connection = await connect('amqp://localhost'); // nanti diganti 'rabbitmq' kalau pakai Docker
    this.channel = await connection.createChannel();
    await this.channel.assertExchange('order_exchange', 'fanout', { durable: false });
  }

  async create(orderData: { customerEmail: string; items: any[] }) {
    const order = this.orderRepository.create({
      ...orderData,
      status: 'Pending',
    });
    const saved = await this.orderRepository.save(order);

    const message = JSON.stringify(saved);
    this.channel.publish('order_exchange', '', Buffer.from(message));
    console.log('[✓] Order published to exchange');

    return saved;
  }

  findStatusById(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }
}
