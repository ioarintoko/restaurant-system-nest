import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'restaurant',
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 10, // ⬅️ tambahkan
      retryDelay: 3000,
    }),
    MenuModule,
    OrderModule,
  ],
})
export class AppModule {}
