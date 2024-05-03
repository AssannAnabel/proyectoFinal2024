import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "src/helpers/enums-type.enum";
import { InvoicesDetail } from "src/invoices_details/entities/invoices_detail.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    idProduct: number

    @Column({ type: 'varchar', length: 8 })
    codeProduct: string

    @Column({ type: 'varchar', length: 45 })
    product: string

    @Column({ type: 'varchar', length: 255 })
    description: string

    @Column({ type: 'int' })
    price: number

    @Column({ type: 'enum', enum: Category })
    category: Category

    @Column({ type: 'int' })
    amount: number

    @Column({ type: 'varchar', length: 255 })
    images: string

    @OneToMany(() => InvoicesDetail, invoiceDetail => invoiceDetail.id_product)
    public invoice_detail: InvoicesDetail[]

   /*  constructor(codeProduct: string, product: string, description: string, price: number, category: Category, amount: number, images: string) {
        this.codeProduct = codeProduct;
        this.product = product;
        this.description = description;
        this.price = price;
        this.category = category;
        this.amount = amount;
        this.images = images
    } */

   /*  public getIdProduct(): number { return this.idProduct }
    public getCodeProduct(): string { return this.codeProduct }
    public getProduct(): string { return this.product }
    public getDescription(): string { return this.description }
    public getPrice(): number { return this.price }
    public getCategory(): Category { return this.category }
    public getStock(): number { return this.amount }
    public getImages(): string { return this.images }

    public setCodeProduct(codeProduct: string): string { return this.codeProduct = codeProduct }
    public setProduct(product: string): string { return this.product = product }
    public setDescription(description: string): string { return this.description = description }
    public setPrice(price: number): number { return this.price = price }
    public setCategory(category: Category): Category { return this.category = category }
    public setStock(amount: number): number { return this.amount = amount }
    public setImages(images: string): string { return this.images = images } */
}
