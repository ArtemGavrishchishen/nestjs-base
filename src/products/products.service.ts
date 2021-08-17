import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateProdictDto } from './dto/create-product.dto'
import { UpdateProdictDto } from './dto/update-product.dto'
import { Product, ProductDocument } from './schemas/product.schema'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateProdictDto): Promise<Product> {
    const newProduct = new this.productModel(productDto)

    return newProduct.save()
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateProdictDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true })
  }
}
