import { Invoice } from "src/invoice/entities/invoice.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoicesDetail {
    @PrimaryGeneratedColumn()
    private idInvoicesDetails: number

    @Column({ type: 'int' })
    private amount: number

    @ManyToOne(() => Invoice, invoice => invoice.invoiceDetails)
    public id_invoice: Invoice

    @ManyToOne(() => Product, product => product.invoice)
    public id_invoiceDetail: InvoicesDetail

    constructor(amount: number) {
        this.amount = amount
    }

    public getIdInvoicesDetails(): number { return this.idInvoicesDetails }
    public getAmount(): number { return this.amount }

    public setAmount(amount: number) { return this.amount = amount }
}
