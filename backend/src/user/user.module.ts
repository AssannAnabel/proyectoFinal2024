import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Invoice])],
  controllers: [UserController],
  providers: [UserService],
  //Export hace que sea visible userService a los demas modulos,
  //especialmente al modulo auth donde autenticaremos
  exports: [UserService]
})
export class UserModule { }
