import { Invoice } from "src/invoice/entities/invoice.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoicesDetail {
    @PrimaryGeneratedColumn()
    private idInvoicesDetails: number

    @Column({ type: 'int' })
    private amount_sold: number

    @ManyToOne(() => Invoice, invoice => invoice.invoiceDetails)
    public id_invoice: Invoice

    @ManyToOne(() => Product, product => product.invoice_detail)
    public id_product: Product

    constructor(amount_sold: number) {
        this.amount_sold = amount_sold
    }

    public getIdInvoicesDetails(): number { return this.idInvoicesDetails }
    public getAmount(): number { return this.amount_sold }

    public setAmount(amount_sold: number) { return this.amount_sold = amount_sold }
}
