import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { IUser } from './interface/user.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({ description: 'User succefully created' })
  @ApiBadRequestResponse({ description: 'Request not valid' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOkResponse()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAllUser()
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<IUser> {
    return await this.userService.findOneUser(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Request not valid' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateUserDto: UpdateUserDto): Promise<IUser> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<IUser> {
    return this.userService.removeUser(id);
  }

  @Post(':id/invoices')
  @ApiCreatedResponse({ description: 'User succefully created' })
  @ApiBadRequestResponse({ description: 'Request not valid' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createInvoiceForUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() createinvoiceData: Partial<CreateInvoiceDto>): Promise<CreateInvoiceDto> {
    return this.userService.createInvoiceForUser(id, createinvoiceData);
  }
}
