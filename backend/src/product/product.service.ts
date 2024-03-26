import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<CreateProductDto>) { }

  async createProduct(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    const query = await this.productRepository.findOne({ where: { product: createProductDto.product } })
    if (query) throw new HttpException({
      status: HttpStatus.CONFLICT, error: `el producto ${createProductDto.product} ya esta cargado en el sistema`
    }, HttpStatus.CONFLICT)
    if (createProductDto.codeProduct.length > 8) throw new HttpException({
      status: HttpStatus.URI_TOO_LONG, error: `el codigo de Producto ${createProductDto.codeProduct} es demasiado largo. intente con 8 caracteres.`
    }, HttpStatus.URI_TOO_LONG)
    const newUser = this.productRepository.create(createProductDto);
    return this.productRepository.save(newUser)
  }

  async findAllProduct(): Promise<CreateProductDto[]> {
    return this.productRepository.find();
  }

  async findOneProduct(id: number): Promise<CreateProductDto> {
    const query: FindOneOptions = { where: { idProduct: id } }
    const userFound = await this.productRepository.findOne(query)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe un producto con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    return userFound;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<CreateProductDto> {
    const queryFound: FindOneOptions = { where: { idProduct: id } }
    const userFound = await this.productRepository.findOne(queryFound)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    const queryProductFound = await this.productRepository.findOne({ where: { product: updateProductDto.product } })
    if (queryProductFound) throw new HttpException({
      status: HttpStatus.CONFLICT, error: `el producto ${updateProductDto.product} ya esta cargado en el sistema`
    }, HttpStatus.CONFLICT)
    const updateUser = Object.assign(userFound, updateProductDto)
    return this.productRepository.save(updateUser)
  }

  async removeProduct(id: number): Promise<CreateProductDto> {
    const query: FindOneOptions = { where: { idProduct: id } }
    const userFound = await this.productRepository.findOne(query)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)

    //falta ver como hacer para no eliminar el usuario, sino cambiar la 
    //propiedad active a false
    const removeUser = await this.productRepository.remove(userFound)
    return removeUser
  }
}