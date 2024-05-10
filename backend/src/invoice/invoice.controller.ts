import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoicesDetailDto } from 'src/invoices_details/dto/create-invoices_detail.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('invoices')
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
  @ApiNotFoundResponse({ description: 'Invoice not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateInvoiceDto> {
    return await this.invoiceService.findOneInvoice(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Invoice not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateInvoiceDto: UpdateInvoiceDto): Promise<CreateInvoiceDto> {
    return await this.invoiceService.updateInvoice(id, updateInvoiceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Invoice not found' })
  async remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CreateInvoiceDto> {
    return await this.invoiceService.removeInvoice(id);
  }

  @Post(':id/invoices-details')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createInvoiceForProduct(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() createinvoiceDetailsData: Partial<CreateInvoicesDetailDto>): Promise<CreateInvoiceDto> {
    return this.invoiceService.addDetailsToInvoice(id, createinvoiceDetailsData);
  }
}
