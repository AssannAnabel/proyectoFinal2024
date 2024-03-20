import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<CreateUserDto>) { }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const query = await this.userRepository.findOne({ where: { username: createUserDto.username, email: createUserDto.email } })
    if (query) throw new HttpException({
      status: HttpStatus.CONFLICT, error: `el nombre de usuario o email ya esta en uso`
    }, HttpStatus.CONFLICT)
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser)
  }

  async findAllUser(): Promise<CreateUserDto[]> {
    return this.userRepository.find();
  }

  async findOneUser(id: number): Promise<CreateUserDto> {
    const query: FindOneOptions = { where: { id: id } }
    const userFound = await this.userRepository.findOne(query)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    return userFound;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<CreateUserDto> {
    const queryFound: FindOneOptions = { where: { id: id } }
    const userFound = await this.userRepository.findOne(queryFound)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    //falta hacer validacion para que, en caso de repetir username o email, salte un error
    const updateUser = Object.assign(userFound, updateUserDto)
    return this.userRepository.save(updateUser)
  }

  async removeUser(id: number): Promise<CreateUserDto> {
    const query: FindOneOptions = { where: { id: id } }
    const userFound = await this.userRepository.findOne(query)
    if (!userFound) throw new HttpException({
      status: HttpStatus.NOT_FOUND, error: `No existe el usuario con el id ${id}`
    }, HttpStatus.NOT_FOUND)
    //falta ver como hacer para no eliminar el usuario, sino cambiar la 
    //propiedad active a false
    const removeUser = this.userRepository.remove(userFound)
    return removeUser
  }
}
