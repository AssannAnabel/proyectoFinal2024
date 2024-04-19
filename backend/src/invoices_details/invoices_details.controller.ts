import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { InvoicesDetailsService } from './invoices_details.service';
import { CreateInvoicesDetailDto } from './dto/create-invoices_detail.dto';
import { UpdateInvoicesDetailDto } from './dto/update-invoices_detail.dto';

@Controller('invoices-details')
export class InvoicesDetailsController {
  constructor(private readonly invoicesDetailsService: InvoicesDetailsService) { }

  /* @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createInvoicesDetailDto: CreateInvoicesDetailDto): Promise<CreateInvoicesDetailDto> {
    return this.invoicesDetailsService.createInv_Det(createInvoicesDetailDto);
  } */

  @Get()
  findAll(): Promise<CreateInvoicesDetailDto[]> {
    return this.invoicesDetailsService.findAllDetailsInv_Det();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return this.invoicesDetailsService.findOneInv_Det(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateInvoicesDetailDto: UpdateInvoicesDetailDto) {
    return this.invoicesDetailsService.updateInv_Det(id, updateInvoicesDetailDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return this.invoicesDetailsService.removeInv_Det(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createInvoiceForProduct(@Body() createinvoiceDetailsData: Partial<CreateInvoicesDetailDto>): Promise<CreateInvoicesDetailDto> {
    return this.invoicesDetailsService.addInvoiceDetail(createinvoiceDetailsData);
  }
 
}
