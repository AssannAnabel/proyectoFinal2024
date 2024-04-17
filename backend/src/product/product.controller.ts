import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateInvoicesDetailDto } from 'src/invoices_details/dto/create-invoices_detail.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProductDto: CreateProductDto): Promise<CreateProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async findAll(): Promise<CreateProductDto[]> {
    return await this.productService.findAllProduct()
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

  @Post(':id/invoices-details')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createInvoiceForProduct(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() createinvoiceDetailsData: Partial<CreateInvoicesDetailDto>): Promise<CreateInvoicesDetailDto> {
    return this.productService.createIvoiceDetailForProduct(id, createinvoiceDetailsData);
  }
}
