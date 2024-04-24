import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<CreateUserDto>,
    @InjectRepository(Invoice) private readonly invoiceRepository: Repository<CreateInvoiceDto>) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas de hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const userFound = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    // Si el usuario ya existe y está marcado como inactivo, actualizar su estado a activo
    if (userFound && userFound.active === false) {
      userFound.active = true;
      createUserDto.password = await this.hashPassword(createUserDto.password)
      await this.userRepository.save(userFound);
      return userFound; // Devolver el usuario existente actualizado
    }

    // Si el usuario ya existe y está activo, lanzar una excepción de conflicto
    if (userFound && userFound.active === true) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `El email ${createUserDto.email} ya está en uso`
      }, HttpStatus.CONFLICT);
    }

    // Si no existe un usuario con ese correo electrónico, crear uno nuevo
    createUserDto.password = await this.hashPassword(createUserDto.password)
    const newUser = this.userRepository.create(createUserDto);
    //Quitamos el atributo password del user
    await this.userRepository.save(newUser)
    return newUser
  }

  async findAllUser(): Promise<CreateUserDto[]> {
    const allUsers = await this.userRepository.find({ relations: ['invoice'] });
    const filterUsers = allUsers.filter((users) => {
      return users.active === true;
    })
    return filterUsers;
  }

  async findOneUser(id: number): Promise<CreateUserDto> {
    const query: FindOneOptions = { where: { idUser: id }, relations: ['invoice'] }
    const userFound = await this.userRepository.findOne(query)
    if (!userFound || userFound.active === false) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    return userFound
  }

  async findUserByEmail(email: string): Promise<CreateUserDto> {
    const userFound = await this.userRepository.findOneBy({ email })
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `Contraseña o Nombre de Usuario Incorrecto`
    }, HttpStatus.NOT_FOUND)
    return userFound
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<CreateUserDto> {
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
    updateUserDto.password = await this.hashPassword(updateUserDto.password)
    const updatedUser = Object.assign(userFound, updateUserDto);
    // Guardar los cambios en la base de datos
    const savedUser = await this.userRepository.save(updatedUser);
    return savedUser
  }

  async removeUser(id: number): Promise<CreateUserDto> {
    const query: FindOneOptions = { where: { idUser: id } }
    const userFound = await this.userRepository.findOne(query)
    if (!userFound || userFound.active === false) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    userFound.active = false;
    const removeUser = await this.userRepository.save(userFound)
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
