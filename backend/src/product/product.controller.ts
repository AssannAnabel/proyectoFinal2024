import {
  Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, ValidationPipe,
  UsePipes, Query, UseInterceptors, UploadedFile, HttpException,
  Req,
  Res
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/helpers/enums-type.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameFile } from 'src/helpers/helpers';
import {
  ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiNoContentResponse,
  ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import multerOptions from 'src/multer/multer.config';
import { v2 as cloudinary } from 'cloudinary'
import { Request } from 'express';
import * as path from 'path';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(FileInterceptor('images', {
    storage: diskStorage({
      destination: './uploads-images',
      filename: renameFile
    }),
    fileFilter: fileFilter
  }))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateProductDto> {
    if (!file) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Image file is required' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const uploadPath = path.join(process.cwd(), 'uploads-images', file.filename);

    try {
      const result = await cloudinary.uploader.upload(uploadPath, {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
      });

      // Combina las imágenes cargadas con otros datos del DTO
      createProductDto.images = result.secure_url;

      // Llama a la función de creación de producto del servicio
      return await this.productService.createProduct(createProductDto);
    } catch (err) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Failed to upload image' },
        HttpStatus.BAD_REQUEST,
      );
    }
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

  // @Patch(':id')
  // @ApiNotFoundResponse({ description: 'Product not found' })
  // @ApiBadRequestResponse({ description: 'Request not valid' })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateProductDto: UpdateProductDto,
  //   @Req() req: Request
  // ): Promise<UpdateProductDto> {
  //   console.log(updateProductDto);

  //   if (!req.files || !req.files['images']) {
  //     throw new HttpException(
  //       { status: HttpStatus.BAD_REQUEST, error: 'Image file is required' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const file = req.files['images'];
  //   const uploadPath = path.join(process.cwd(), 'uploads-images', file.name);

  //   // Mueve el archivo a una ubicación temporal
  //   await new Promise<void>((resolve, reject) => {
  //     file.mv(uploadPath, (err) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });

  //   try {
  //     console.log(file);

  //     const result = await cloudinary.uploader.upload(uploadPath, {
  //       public_id: `${Date.now()}`,
  //       resource_type: "auto"
  //     });

  //     // Aquí puedes manejar la lógica de tu aplicación con el resultado de Cloudinary
  //     updateProductDto.images = result.secure_url; // Actualiza el DTO con la URL de la imagen subida

  //     // Elimina el archivo temporal después de la subida
  //     //fs.unlinkSync(uploadPath);

  //     return await this.productService.updateProduct(id, updateProductDto);

  //   } catch (err) {
  //     console.log("Error", err);
  //     // Elimina el archivo temporal en caso de error
  //     /* if (fs.existsSync(uploadPath)) {
  //       fs.unlinkSync(uploadPath);
  //     } */
  //     throw new HttpException(
  //       { status: HttpStatus.BAD_REQUEST, error: 'Failed to upload image' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('images', {
    storage: diskStorage({
      destination: './uploads-images',
      filename: renameFile
    }),
    fileFilter: fileFilter
  }))
  async update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    let images: string | undefined;

    // Si hay un archivo de imagen cargado, establece 'images'
    if (file) {
      const uploadPath = path.join(process.cwd(), 'uploads-images', file.filename);

      try {
        const result = await cloudinary.uploader.upload(uploadPath, {
          public_id: `${Date.now()}`,
          resource_type: 'auto',
        });

        images = result.secure_url;
      } catch (err) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'Failed to upload image' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Combinar 'images' cargadas con otros datos del DTO
    if (images) {
      updateProductDto.images = images;
    }

    // Llamar a la función de actualización de producto
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
        status: HttpStatus.BAD_REQUEST,
        error: `No se proporcionó ningun archivo-`
      }, HttpStatus.BAD_REQUEST)
    }

    return await this.productService.uploadProductsFromCsv(file)
  }
}