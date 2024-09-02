import { Controller, Get } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('products')
@Controller('product')
export class ProductController {
constructor(private productService: ProductService){}

@Get()
 async getProducts(): Promise<any> {
    return this.productService.getProducts();
 }

}