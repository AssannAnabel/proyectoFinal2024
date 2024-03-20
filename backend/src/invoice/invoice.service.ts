import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private readonly invoiceRepository: Repository<CreateInvoiceDto>) { }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<CreateInvoiceDto> {
    const newInvoice = this.invoiceRepository.create(createInvoiceDto)
    return this.invoiceRepository.save(newInvoice)
  }

  async findAllInvoice(): Promise<CreateInvoiceDto[]> {
    return this.invoiceRepository.find()
  }

  async findOneInvoice(id: number): Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idInvoice: id } }
    const invoiceFound = this.invoiceRepository.findOne(query)
    if (!invoiceFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `no existe una factura con el id ${id} `
    }, HttpStatus.NOT_FOUND)
    return invoiceFound;
  }

  async updateInvoice(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idInvoice: id } }
    const invoiceFound = this.invoiceRepository.findOne(query)
    if (!invoiceFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `no existe una factura con el id ${id} `
    }, HttpStatus.NOT_FOUND)
    const updateUser = await Object.assign(invoiceFound, updateInvoiceDto)
    return await this.invoiceRepository.save(updateUser)
  }

  async removeInvoice(id: number):Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idInvoice: id } }
    const invoiceFound = await this.invoiceRepository.findOne(query)
    if (!invoiceFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `no existe una factura con el id ${id} `
    }, HttpStatus.NOT_FOUND)
    const removeInvoice = await this.invoiceRepository.remove(invoiceFound)
    return removeInvoice
  }
}
