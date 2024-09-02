import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {

getProducts(): string {
    return 'TODOS LOS PRODUCTOS \n Proximamente subidos a la nube.'
}

}