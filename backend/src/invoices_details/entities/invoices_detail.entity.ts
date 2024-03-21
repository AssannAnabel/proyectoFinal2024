import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoicesDetail {
    @PrimaryGeneratedColumn()
    private idInvoicesDetails: number

    @Column({ type: 'int' })
    private amount: number

    constructor(idInvoicesDetails: number, amount: number) {
        this.idInvoicesDetails = idInvoicesDetails;
        this.amount = amount
    }

    public getIdInvoicesDetails(): number { return this.idInvoicesDetails }
    public getAmount(): number { return this.amount }

    public setIdInvoicesDetails(idInvoicesDetails: number) { return this.idInvoicesDetails = idInvoicesDetails }
    public setAmount(amount: number) { return this.amount = amount }
}
