import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Category } from 'src/helpers/enums-type.enum';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<CreateProductDto>) { }

  async createProduct(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    const query = await this.productRepository.findOne({ where: { product: createProductDto.product } })
    if (query) throw new HttpException({
      status: HttpStatus.CONFLICT, error: `el producto ${createProductDto.product} ya esta cargado en el sistema`
    }, HttpStatus.CONFLICT)
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

  async uploadProductsFromCsv(file: Express.Multer.File) {
    const filePath = path.normalize(file.path);
    let products = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', async (row: CreateProductDto) => {
        try {
          products.push(
            this.productRepository.create({
              product: row.product,
              description: row.description,
              price: row.price,
              category: row.category,
              amount: row.amount,
              images: row.images
            }));
          return `Carga exitosa`
        } catch (error) {
          console.error('Error al guardar en la base de datos:', error);
        }
      })
      .on('end', (rowCount: number) => {
        console.log(`Se han guardado ${rowCount} filas en la base de datos`);
        return{ 
          msg: `Se han guardado ${rowCount} filas en la base de datos`,
          file: this.productRepository.save(products)
        }
      });
    
  }
}
