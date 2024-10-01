import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { findIndex } from 'rxjs';
import { Producto_model } from 'src/interfaces/productos';

@Injectable()
export class ProductService {

    async getProducts(): Promise<any> {
        const fs = require('fs');

        try {
            // const rawData = await fs.promises.readFile('./src/data/database.json', 'utf-8');
            const rawData = await fs.promises.readFile(join(__dirname, '..', '/static/data/database.json'), 'utf-8');
            // Convierte la cadena JSON a un objeto
            const database = JSON.parse(rawData);
          
            return database;
          } catch (err) {
            console.error(err);
          }        

        //   return 'TODOS LOS PRODUCTOS \n Proximamente subidos a la nube.'
    }

    async delete(idProduct: number): Promise<any> {
        try {
            // * resuelve id Category
            const idCategory = (idProduct / 100) | 0;

            // * Carga datos en database
            const fs = require('fs');
            let database = await this.getProducts();

            // * resuelve indice de Category
            const indexCategory = database.findIndex(cat => cat.id === idCategory);

            // * borra producto y guardar
            database[indexCategory].productos = database[indexCategory].productos.filter(prod => prod.id !== idProduct);
            // await fs.promises.writeFile('./src/data/database.json', JSON.stringify(database), 'utf-8');
            await fs.promises.writeFile(join(__dirname, '..', '/static/data/database.json'), JSON.stringify(database), 'utf-8');


            return {
                "status": "success",
                "message": "Registro eliminado exitosamente",
                "deletedId": idProduct // ID del registro eliminado
            };
        } catch (error) {
            return {
                statusCode: error.status,
                message: 'Error: ' + error.message
            };

            
        }
    }

    async post(product: Producto_model): Promise<any> {
        try {
            // * resuelve id Category
            const idCategory = (product.id / 100) | 0;
            console.log('id categoria: ', idCategory);
 
            // * Carga datos en database
            const fs = require('fs');
            let database = await this.getProducts();

            // * resuelve indice de Category
            const indexCategory = database.findIndex(cat => cat.id === idCategory);
            console.log('index categoria: ', indexCategory);

            // // * carga productos con los productos de Category
            // let productos = database[indexCategory].productos;
            
            // * Agregar producto a Productos
            database[indexCategory].productos.push(product);
            // productos.push(product);
            // console.log('Productos después de agregar: ', productos.nombre);

            // * Guardar database
            await fs.promises.writeFile(join(__dirname, '..', '/static/data/database.json'), JSON.stringify(database), 'utf-8');
            // await fs.promises.writeFile('./src/data/database.json', JSON.stringify(database), 'utf-8');

            return {
                statusCode: 201,
                message: 'Recurso creado con éxito'
            };
        } catch (error) {
            return {
                statusCode: error.status,
                message: 'Error: ' + error.message
            };
        }
    }

    async put(id:number, product: Producto_model): Promise<any> {
        try {
            const idCategory = (id / 100) | 0;
            // console.log('id categoria: ', idCategory);
            const indexCategory = idCategory - 1;
            // console.log('index categoria: ', indexCategory);
            // console.log(__dirname);

            const fs = require('fs');
            let database = await this.getProducts();
            // console.log((database));
            let productos = database[indexCategory].productos;
            // console.log('array products: ',productos);

            const indice = productos.findIndex((p => p.id === id ));
            // console.log('indice del producto : ', indice);
            // console.log('producto A Modificar: ',productos[indice]);
            if (indice !== -1) {
                productos.splice(indice, 1, product);
                console.log('producto Modificado: ',productos[indice]);
            } else {
                console.error('No se encontró el producto para modificar');
                return {
                    statusCode: 404,
                    message: 'No se encontró el producto para modificar'
                };
            }

            database[indexCategory].productos = productos;
            await fs.promises.writeFile(join(__dirname, '..', '/static/data/database.json'), JSON.stringify(database), 'utf-8');

            return {
                statusCode: 201,
                message: 'Recurso creado con éxito'
            };
        } catch (error) {
            return {
                statusCode: error.status,
                message: 'Error: ' + error.message
            };
            
        }
        // database.categorias[idCategory].products.push(product);
    }

}