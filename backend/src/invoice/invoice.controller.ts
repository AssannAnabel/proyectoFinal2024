import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<CreateInvoiceDto> {
    return await this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Get()
  async findAll(): Promise<CreateInvoiceDto[]> {
    return await this.invoiceService.findAllInvoice();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateInvoiceDto> {
    return await this.invoiceService.findOneInvoice(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateInvoiceDto: UpdateInvoiceDto): Promise<CreateInvoiceDto> {
    return await this.invoiceService.updateInvoice(id, updateInvoiceDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateInvoiceDto> {
    return await this.invoiceService.removeInvoice(id);
  }
}
