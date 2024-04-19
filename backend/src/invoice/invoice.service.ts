import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateInvoicesDetailDto } from 'src/invoices_details/dto/create-invoices_detail.dto';
import { InvoicesDetail } from 'src/invoices_details/entities/invoices_detail.entity';

@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private readonly invoiceRepository: Repository<CreateInvoiceDto>,
    @InjectRepository(InvoicesDetail) private readonly invoicesDetailsRepository: Repository<CreateInvoicesDetailDto>) { }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<CreateInvoiceDto> {
    const newInvoice = this.invoiceRepository.create(createInvoiceDto)
    return this.invoiceRepository.save(newInvoice)
  }

  async findAllInvoice(): Promise<CreateInvoiceDto[]> {
    return this.invoiceRepository.find({ relations: ['invoiceDetails'] })
  }

  async findOneInvoice(id: number): Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idInvoice: id }, relations: ['invoiceDetails'] }
    const invoiceFound = await this.invoiceRepository.findOne(query)
    if (!invoiceFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `no existe una factura con el id ${id} `
    }, HttpStatus.NOT_FOUND)
    return invoiceFound;
  }

  async updateInvoice(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idInvoice: id } }
    const invoiceFound = await this.invoiceRepository.findOne(query)
    if (!invoiceFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `no existe una factura con el id ${id} `
    }, HttpStatus.NOT_FOUND)
    const updateUser = Object.assign(invoiceFound, updateInvoiceDto)
    return await this.invoiceRepository.save(updateUser)
  }

  async removeInvoice(id: number): Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idInvoice: id } }
    const invoiceFound = await this.invoiceRepository.findOne(query)
    if (!invoiceFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `no existe una factura con el id ${id} `
    }, HttpStatus.NOT_FOUND)
    const removeInvoice = await this.invoiceRepository.remove(invoiceFound)
    return removeInvoice
  }

  async addDetailsToInvoice(invoiceId: number, invDetailData: Partial<CreateInvoicesDetailDto>): Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idInvoice: invoiceId } }
    const invoiceFound = await this.invoiceRepository.findOne(query)
    if (!invoiceFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el producto con el id ${invoiceId}`
    }, HttpStatus.NOT_FOUND)

    await this.invoicesDetailsRepository.save(invDetailData);

    return await this.invoiceRepository.save(invoiceFound);
  }
}
