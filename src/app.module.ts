import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigController } from './config.controller';
import { ProductController } from './product.controller';

import { ConfigService } from './services/config.service';
import { AppService } from './services/app.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [],
  controllers: [AppController, ConfigController, ProductController],
  providers: [ConfigService, AppService, ProductService],
})
export class AppModule {}
