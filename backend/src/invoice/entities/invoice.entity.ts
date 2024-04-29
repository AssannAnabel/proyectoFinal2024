import { InvoicesDetail } from "src/invoices_details/entities/invoices_detail.entity";
import { User } from "src/user/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    private idInvoice: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    private invoiceDate: Date

    @Column({ type: 'int' })
    private total_without_iva: number

    @Column({ type: 'int' })
    private total_with_iva: number

    @ManyToOne(() => User, user => user.invoice)
    public id_user: User

    @OneToMany(() => InvoicesDetail, invoiceDetail => invoiceDetail.id_invoice)
    public invoiceDetails: InvoicesDetail[]

    @BeforeInsert()
    @BeforeUpdate()
    private calculateTotalWithIva() {
        this.total_with_iva = this.total_without_iva * 1.21
    }

    constructor(invoiceDate: Date, total_without_iva: number) {
        this.invoiceDate = invoiceDate;
        this.total_without_iva = total_without_iva;
        this.calculateTotalWithIva()
    }

    public getIdInvoice(): number { return this.idInvoice }
    public getInvoiceDate(): Date { return this.invoiceDate }
    public getTotalWithoutIva(): number { return this.total_without_iva }
    public getTotalWithIva(): number { return this.total_with_iva }

    public setInvoiceDate(invoiceDate: Date): Date { return this.invoiceDate = invoiceDate }
    public setTotalWithoutIva(total_without_iva: number): number { return this.total_without_iva = total_without_iva }
    public setTotalWithIva(total_with_iva: number): number { return this.total_with_iva = total_with_iva }
}

