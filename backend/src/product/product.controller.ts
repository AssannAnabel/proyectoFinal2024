import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, ValidationPipe, UsePipes, Query, UseInterceptors, UploadedFile, BadRequestException, HttpException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/helpers/enums-type.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameFile } from 'src/helpers/helpers';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Product succefully created' })
  @ApiBadRequestResponse({ description: 'Request not valid' })
  @ApiConflictResponse({ description: 'Product name already exist in the db' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProductDto: CreateProductDto): Promise<CreateProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @ApiNoContentResponse({ description: `There's no content for this product` })
  async findAll(@Query('category') category?: Category): Promise<CreateProductDto[]> {
    if (category) {
      return await this.productService.findByCategory(category)
    } else {
      return await this.productService.findAllProduct()
    }
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Product not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateProductDto> {
    return await this.productService.findOneProduct(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiBadRequestResponse({ description: 'Request not valid' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateProductDto: UpdateProductDto): Promise<UpdateProductDto> {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async removeProduct(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateProductDto> {
    return this.productService.removeProduct(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of products',
    type: CreateProductDto,
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: renameFile
    }),
    fileFilter: fileFilter
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST, error: `No se proporcionó ningun archivo-`
      }, HttpStatus.BAD_REQUEST)
    }

    return await this.productService.uploadProductsFromCsv(file)
  }
}