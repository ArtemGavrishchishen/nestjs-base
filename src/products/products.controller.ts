import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { CreateProdictDto } from './dto/create-product.dto'
import { UpdateProdictDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'
import { Product } from './schemas/product.schema'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll()
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProdictDto: CreateProdictDto): Promise<Product> {
    return this.productsService.create(createProdictDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }

  @Put(':id')
  update(
    @Body() updateProdictDto: UpdateProdictDto,
    @Param('id') id: string
  ): Promise<Product> {
    return this.productsService.update(id, updateProdictDto)
  }
}
