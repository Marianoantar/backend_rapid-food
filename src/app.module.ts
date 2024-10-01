import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigController } from './config.controller';
import { ProductController } from './product.controller';

import { ConfigService } from './services/config.service';
import { AppService } from './services/app.service';
import { ProductService } from './services/product.service';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [    
    // ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', 'uploads'),
    // }),
    MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '.', '/static/uploads'),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newFilename = `${uniqueSuffix}-${file.originalname}`;
        cb(null, newFilename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(new Error('Only image files are allowed!'), false);
      } else {
        cb(null, true);
      }
    },
  }),
],
  controllers: [AppController, ConfigController, ProductController, FileController],
  providers: [ConfigService, AppService, ProductService, FileService],
})
export class AppModule {}
