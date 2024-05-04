import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, ValidationPipe, UsePipes, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/helpers/enums-type.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameFile } from 'src/helpers/helpers';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProductDto: CreateProductDto): Promise<CreateProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async findAll(@Query('category') category?: Category): Promise<CreateProductDto[]> {
    if (category) {
      return await this.productService.findByCategory(category)
    } else {
      return await this.productService.findAllProduct()
    }
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateProductDto> {
    return await this.productService.findOneProduct(id);
  }

  @Patch(':id')
  
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateProductDto: UpdateProductDto): Promise<UpdateProductDto> {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateProductDto> {
    return this.productService.removeProduct(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: renameFile
    }),
    fileFilter: fileFilter
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Llamar al servicio para procesar el archivo CSV
    return await this.productService.uploadProductsFromCsv(file);
  }
}
