import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigModel } from './interfaces/config';
import { ConfigService } from './services/config.service';


// CONFIG CONTROLLER
@Controller('config')
 export class ConfigController {
  constructor(private readonly configService: ConfigService) {}


  @Get()
  async getConfig(): Promise<ConfigModel> {
    return this.configService.getConfig();
  }


  @Post()
  async updateConfig(@Body() config: ConfigModel): Promise<boolean> {
      const res = await this.configService.saveConfig(config);
      return res;
  }
 
}
