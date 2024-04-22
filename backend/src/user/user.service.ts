import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { Iuser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<CreateUserDto>,
    @InjectRepository(Invoice) private readonly invoiceRepository: Repository<CreateInvoiceDto>) { }

  async createUser(createUserDto: CreateUserDto): Promise<Iuser> {
    const query = await this.userRepository.findOne({ where: { email: createUserDto.email } })
    if (query) throw new HttpException({
      status: HttpStatus.CONFLICT, error: `el email ${createUserDto.email} ya esta en uso`
    }, HttpStatus.CONFLICT)
    const newUser = this.userRepository.create(createUserDto);

    //Quitamos el atributo password del user
    //Igualmente para autenticaciones el atributo llegara al front pero permanecera oculto
    const { password, ...rest } = newUser
    await this.userRepository.save(newUser)
    return rest
  }

  async findAllUser(): Promise<Iuser[]> {
    const allUsers = await this.userRepository.find({ relations: ['invoice'] });
    const aux = allUsers.map((users) => {
      const { password, ...rest } = users
      return rest;
    })
    return aux;
  }

  async findOneUser(id: number): Promise<Iuser> {
    const query: FindOneOptions = { where: { idUser: id }, relations: ['invoice'] }
    const userFound = await this.userRepository.findOne(query)
    if (!userFound || userFound.active === false) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    const { password, ...rest } = userFound
    return rest
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Iuser> {
    const queryFound: FindOneOptions = { where: { idUser: id } }
    const userFound = await this.userRepository.findOne(queryFound)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)

    const existingUserWithEmail = await this.userRepository.findOne({ where: { email: updateUserDto.email } })
    if (existingUserWithEmail && existingUserWithEmail.idUser !== userFound.idUser) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `El email ${updateUserDto.email} ya está en uso`
      }, HttpStatus.CONFLICT);
    }
    // Actualizar el usuario con los datos proporcionados
    const updatedUser = Object.assign(userFound, updateUserDto);
    // Guardar los cambios en la base de datos
    const savedUser = await this.userRepository.save(updatedUser);
    const { password, ...rest } = savedUser
    return rest
  }

  async removeUser(id: number): Promise<CreateUserDto> {
    const query: FindOneOptions = { where: { idUser: id } }
    const userFound = await this.userRepository.findOne(query)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    userFound.active = false;
    const removeUser = this.userRepository.save(userFound)
    return removeUser
  }

  async createInvoiceForUser(userId: number, invoiceData: Partial<CreateInvoiceDto>): Promise<CreateInvoiceDto> {
    const query: FindOneOptions = { where: { idUser: userId } }
    const userFound = await this.userRepository.findOne(query)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${userId}`
    }, HttpStatus.NOT_FOUND)
    const newInvoice = this.invoiceRepository.create({
      ...invoiceData,
      id_user: userId
    })
    await this.invoiceRepository.save(newInvoice)
    return newInvoice
  }
}
