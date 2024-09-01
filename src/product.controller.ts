import { Controller, Get } from "@nestjs/common";
import { ProductService } from "./services/product.service";


@Controller('product')
export class ProductController {
constructor(private productService: ProductService){}

@Get()
 getProducts(): string {
    return this.productService.getProducts();
 }

}