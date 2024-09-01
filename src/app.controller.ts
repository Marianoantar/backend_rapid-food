import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './services/app.service';
import { ConfigService } from './services/config.service';


@Controller()
export class AppController {
  constructor(private readonly appService:AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

