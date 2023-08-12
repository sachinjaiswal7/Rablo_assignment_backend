import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : [true,"ProductId is required and it should be unique"],
        unique : [true,"ProductId of the product must be unique"]
    },
    name : {
        type : String,
        required : [true, "Name is required"],
    },
    price : {
        type : Number,
        required : [true,"Price of the product is required"]
    },
    featured : {
        type : Boolean,
        default : false
    },
    rating : {
        type : mongoose.Types.Decimal128,
        min : 0,
        max : 5,
        default : 0
    },
    createdAt : {
        type : Date,
        required : [true,"Time of creation of product is required"]
    },
    company : {
        type : String,
        required : [true,"Company is a required field"]
    }
})


const Product = mongoose.model("Product",productSchema);

export default Product;