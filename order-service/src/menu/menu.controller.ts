import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController implements OnModuleInit {
  constructor(private readonly menuService: MenuService) {}

  async onModuleInit() {
    await this.menuService.seedData(); // Auto-seed saat service di-load
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }
}
