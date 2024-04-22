import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { Iuser } from './interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<Iuser> {    
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<Iuser[]> {
    return await this.userService.findAllUser()
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Iuser> {
    return await this.userService.findOneUser(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateUserDto: UpdateUserDto): Promise<Iuser> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateUserDto> {
    return this.userService.removeUser(id);
  }

  @Post(':id/invoices')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createInvoiceForUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() createinvoiceData: Partial<CreateInvoiceDto>): Promise<CreateInvoiceDto> {
    return this.userService.createInvoiceForUser(id, createinvoiceData);
  } 
}
