import { Rol } from "src/helpers/enums-type.enum";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private idUser: number

    @Column({ type: 'varchar', length: 45, nullable: false })
    private name: string

    @Column({ type: 'varchar', length: 45, nullable: false })
    private lastname: string

    @Column({ type: 'varchar', nullable: false, unique: true, length: 45 })
    private email: string

    @Column({ type: 'varchar', length: 60, nullable: false })
    private password: string

    @Column({ type: 'enum', enum: Rol, default: Rol.USER })
    private rol: Rol

    @Column({ type: 'boolean', default: true })
    private active: boolean

    @Column({ type: 'varchar', length: 15 })
    private phone: string

    @Column({ type: 'datetime' })
    private birthDate: Date

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    private createdAt: Date

    @OneToMany(() => Invoice, invoice => invoice.id_user)
    public invoice: Invoice[]

    constructor(name: string, lastname: string, email: string, password: string, rol: Rol, active: boolean, phone: string, birthDate: Date, createdAt: Date) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.active = active;
        this.phone = phone;
        this.birthDate = birthDate;
        this.createdAt = createdAt
    }

    public getIdUser(): number { return this.idUser }
    public getName(): string { return this.name }
    public getLastname(): string { return this.lastname }
    public getEmail(): string { return this.email }
    public getPassword(): string { return this.password }
    public getRol(): Rol { return this.rol }
    public getActive(): boolean { return this.active }
    public getPhone(): string { return this.phone }
    public getBirthDate(): Date { return this.birthDate }
    public getCreatedAt(): Date { return this.createdAt }

    public setIdUser(idUser: number): number { return this.idUser = idUser }
    public setName(name: string): string { return this.name = name }
    public setLastname(lastname: string): string { return this.lastname = lastname }
    public setEmail(email: string): string { return this.email = email }
    public setPassword(password: string): string { return this.password = password }
    public setRol(rol: Rol): Rol { return this.rol = rol }
    public setActive(active: boolean): boolean { return this.active = active }
    public setPhone(phone: string): string { return this.phone = phone }
    public setBirthDate(birthDate: Date): Date { return this.birthDate = birthDate }
    public setCreatedAt(createdAt: Date): Date { return this.createdAt = createdAt }
}