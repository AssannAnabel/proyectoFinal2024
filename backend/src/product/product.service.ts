import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateInvoicesDetailDto } from 'src/invoices_details/dto/create-invoices_detail.dto';
import { InvoicesDetail } from 'src/invoices_details/entities/invoices_detail.entity';
import { Category } from 'src/common/enums-type.enum';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<CreateProductDto>,
    @InjectRepository(InvoicesDetail) private readonly invoicesDetailsRepository: Repository<CreateInvoicesDetailDto>) { }

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
    return this.productRepository.find({ relations: ['invoice_detail'] });
  }

  async findOneProduct(id: number): Promise<CreateProductDto> {
    const query: FindOneOptions = { where: { idProduct: id }, relations: ['invoice_detail'] }
    const productFound = await this.productRepository.findOne(query)
    if (!productFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe un producto con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    return productFound;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<CreateProductDto> {
    const queryFound: FindOneOptions = { where: { idProduct: id } }
    const productFound = await this.productRepository.findOne(queryFound)
    if (!productFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe un producto con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    /* const queryProductFound = await this.productRepository.findOne({ where: { product: updateProductDto.product } })
    if (queryProductFound) throw new HttpException({
      status: HttpStatus.CONFLICT, error: `el producto ${updateProductDto.product} ya esta cargado en el sistema`
    }, HttpStatus.CONFLICT) */
    const updateUser = Object.assign(productFound, updateProductDto)
    return this.productRepository.save(updateUser)
  }

  async removeProduct(id: number): Promise<CreateProductDto> {
    const query: FindOneOptions = { where: { idProduct: id } }
    const productFound = await this.productRepository.findOne(query)
    if (!productFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe un producto con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    const removeUser = await this.productRepository.remove(productFound)
    return removeUser
  }

  async findByCategory(category: Category): Promise<CreateProductDto[]> {
    const productFound = await this.productRepository.findBy({
      category
    })
    if (!productFound.length) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No hay productos de ${category}`
    }, HttpStatus.NOT_FOUND)
    return productFound
  }

}
