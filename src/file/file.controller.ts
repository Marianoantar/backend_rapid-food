import {  Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('files')
@Controller('files')
export class FileController {

    constructor(private readonly fileService: FileService) {}

    @Get()
      getHello(): string {
    return this.fileService.getHello();
  }

//   import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
    // ! FALTA METODO PARA SUBIR ARCHIVO
    //* de todas formas esta subiendo la imagen por otro lado
    //* a la carpeta project/uploads en vez de project/static/uploads 
  
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { 
        message: 'Archivo subido exitosamente',
        filename: file.filename };
  }


}
