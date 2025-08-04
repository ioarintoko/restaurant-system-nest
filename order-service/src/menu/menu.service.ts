import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async seedData(): Promise<void> {
    const count = await this.menuRepository.count();
    if (count === 0) {
      await this.menuRepository.save([
        { name: 'Nasi Goreng', price: 25000 },
        { name: 'Mie Ayam', price: 20000 },
        { name: 'Sate Ayam', price: 30000 },
      ]);
    }
  }
}
