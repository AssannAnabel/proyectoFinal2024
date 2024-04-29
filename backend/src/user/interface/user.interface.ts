import { Rol } from "src/common/enums-type.enum"

export interface IUser {
    idUser: number,
    name: string,
    lastname: string,
    email: string,
    rol: Rol,
    active: boolean,
    phone: string,
    birthDate: Date,
    createdAt: Date
}