import { InferAttributes, InferCreationAttributes } from "sequelize";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Table,Model, HasMany } from "sequelize-typescript";
import { cashType, documentType, paymentModeType } from "../enum/quotation.enum";
import { UserRepository } from "src/modules/authentication/entity/users.entity";


@Table({tableName:"quotation_form"})
export class QuotationFormRepository extends Model <InferCreationAttributes<QuotationFormRepository>,InferAttributes<QuotationFormRepository>>{

    @Column({ autoIncrement: true, primaryKey: true })
    id:number

    @Column
    customer_name:string

    @Column
    customer_reference_id:string

    @Column
    doc_number:string

    @Column(DataType.DATE)
    doc_date:Date

    @Column
    contact_person:string

    @Column
    email:string

    @Column
    contact_number:string

    @Column
    customer_reference:string

    @Column(DataType.ENUM(...Object.values(paymentModeType)))
    payment_mode:string

    @Column(DataType.ENUM(...Object.values(cashType)))
    currency:string

    @Column
    quotation_validity:string

    @Column
    address:string

    @Column
    remark_brand:string

    @Column
    delivery:string

    @Column(DataType.DECIMAL)
    sub_total:number

    @Column(DataType.DECIMAL)
    total_discount:number

    @Column(DataType.DECIMAL)
    total_tax:number

    @Column(DataType.DECIMAL)
    grand_total:number

    @BelongsTo(()=>UserRepository,{as:"users",foreignKey:'created_user_id'})
    users:UserRepository
    @ForeignKey(()=>UserRepository)
    @Column
    created_user_id:number

    @HasMany(() => QuotationItemRepository)
    quotation_items: QuotationItemRepository[];
    
}


interface QuotationItem {
    quotation_id: number;
    item_number: number;
    description: string;
    quantity: number;
    units: string;
    price: number;
    discount: number;
    tax: number;
    amount:number
  }

@Table({tableName:"document_details"})
export class documentDetailRepository extends Model <InferCreationAttributes<documentDetailRepository>,InferAttributes<documentDetailRepository>>{

    @Column({ autoIncrement: true, primaryKey: true })
    id:number

    @Column
    doc_number:string

    @Column(DataType.ENUM(...Object.values(documentType)))
    doc_type:string

    @Column
    is_deleted:boolean
 
}

@Table({tableName: 'quotation_items'})
export class QuotationItemRepository extends Model <InferCreationAttributes<QuotationItemRepository>,InferAttributes<QuotationItemRepository>>{
    @Column({
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @ForeignKey(() => QuotationFormRepository)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    quotation_id: number;
  
    @BelongsTo(() => QuotationFormRepository)
    quotation_form: QuotationFormRepository;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    item_number: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    description: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    quantity: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    units: string;
  
    @Column({
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    })
    price: number;
  
    @Column({
      type: DataType.DECIMAL(5, 2),
      defaultValue: 0,
    })
    discount: number;
  
    @Column({
      type: DataType.DECIMAL(5, 2),
      defaultValue: 0,
    })
    tax: number;
  
    @Column({
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    })
    amount: number;
}
@Table({tableName: 'temp_quotation_items'})
export class TempQuotationItemRepository extends Model <InferCreationAttributes<TempQuotationItemRepository>,InferAttributes<TempQuotationItemRepository>>{
    @Column({
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
    
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    item_number: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    doc_number: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    description: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    quantity: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    units: string;
  
    @Column({
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    })
    price: number;
  
    @Column({
      type: DataType.DECIMAL(5, 2),
      defaultValue: 0,
    })
    discount: number;
  
    @Column({
      type: DataType.DECIMAL(5, 2),
      defaultValue: 0,
    })
    tax: number;
  
    @Column({
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    })
    amount: number;
}