import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { ApiTags } from "@nestjs/swagger";
import { Producto_model } from "./interfaces/productos";

@ApiTags('products')
@Controller('product')
export class ProductController {
constructor(private productService: ProductService){}

@Get()
 async getProducts(): Promise<any> {
    return this.productService.getProducts();
 }

 @Put(':id')
 async updateProduct(@Param('id') id:string, @Body() product: Producto_model): Promise<any> {
    const idNum = parseInt(id);
    const res = await this.productService.put(idNum, product);
    return res;
 }
 
 @Post('')
async newProduct(@Body() product: Producto_model): Promise<any> {
    const res = await this.productService.post(product);
    return res;

}

 @Delete(':id')
 async deleteProduct(@Param('id') id: string): Promise<any> {
    const idNum = parseInt(id);
    const res = await this.productService.delete(idNum);
    return res;
 }




}