import { Schema, model, Document } from 'mongoose'

export interface IProduct {
  sku: string
  productQuantity: number
  productName: string
  productPrice: number
  productImages: string[]
  productDescription: string
}

const productSchema = new Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImages: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length > 0,
      message: 'At least one image is required',
    },
  },
  productDescription: {
    type: String,
  },
})

const Product = model<IProduct>('Product', productSchema)

export default Product
