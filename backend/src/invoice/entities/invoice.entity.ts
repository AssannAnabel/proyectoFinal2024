import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(idInvoice: number, invoiceDate: Date, total_without_iva: number, total_with_iva: number) {
        this.idInvoice = idInvoice;
        this.invoiceDate = invoiceDate;
        this.total_without_iva = total_without_iva;
        this.total_with_iva = total_with_iva
    }

    public getIdInvoice(): number { return this.idInvoice }
    public getInvoiceDate(): Date { return this.invoiceDate }
    public getTotalWithoutIva(): number { return this.total_without_iva }
    public getTotalWithIva(): number { return this.total_with_iva }

    public setIdInvoice(idInvoice: number): number { return this.idInvoice = idInvoice }
    public setInvoiceDate(invoiceDate: Date): Date { return this.invoiceDate = invoiceDate }
    public setTotalWithoutIva(total_without_iva: number): number { return this.total_without_iva = total_without_iva }
    public setTotalWithIva(total_with_iva: number): number { return this.total_with_iva = total_with_iva }
}

