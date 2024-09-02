import { Injectable } from '@nestjs/common';
import { Categoria_model } from 'src/interfaces/categorias';

@Injectable()
export class ProductService {

    async getProducts(): Promise<any> {
        const fs = require('fs');

        try {
            const rawData = await fs.promises.readFile('./src/data/database.json', 'utf-8');
            // Convierte la cadena JSON a un objeto
            const database = JSON.parse(rawData);
          
            return database;
          } catch (err) {
            console.error(err);
          }        

        //   return 'TODOS LOS PRODUCTOS \n Proximamente subidos a la nube.'
    }

}