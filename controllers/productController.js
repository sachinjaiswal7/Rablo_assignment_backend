import CustomError from "../utils/CustomError.js";
import Product from "../models/productModel.js";


// this function is used to add a new product to the database
export const addProduct = async (req, res, next) => {
    //taking all the fields 
    const { productId, name, price, featured, createdAt, company ,rating} = req.body;

    // checking if any of the field is undefined or null -> if any one of the field is not given then send an error
    if (!productId || !name || !price || featured === undefined || featured === null || !createdAt || !company) {
        return next(new CustomError(400, "You haven't given all the required fields"));
    }
    
    //checking the rating range.
    if(rating && (rating < 0 || rating > 5)){
        return next(new CustomError(400, "The rating should be between 0 and 5 inclusive"));
    }

    try {
        //checking if any product already exists with the given productId, If true then send an error to the client 
        const oldProduct = await Product.findOne({ productId });
        if (oldProduct) {
            return next(new CustomError(400, "There is already one product with this id please provide a unique productId to add a new product into the database"));
        }
        //adding the product to the database 
        const newProduct = await Product.create({ productId, name, price, createdAt, featured, company, rating : ((rating)?rating : 0) });

        //sending the response back to the client with the newly created product.
        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product: newProduct
        })
    } catch (err) {
        next(err);
    }
}


// this function is used to fetch all the products which are available in the database.
export const getAllProduct = async(req,res,next) => {
    try{
        // querying the database for the all the products.
        const allProduct = await Product.find({});

        //sending response back to the client with all the fetched products 
        res.status(200).json({
            success : true,
            messsage : "Fetched all Product successfully",
            products : allProduct
        })
    }catch(err){
        //handling the error if any occurs.
        next(err);
    }
}



// this function is used to update the details of a particular function.
export const updateProduct = async(req,res,next) => {
    //taking all the fields (we are taking all the field but only some of them will be updated - the updation depends upon the value given by the client side persono);
    const { productId, name, price, featured, company } = req.body;

    if(!productId){
        return next(new CustomError(400,"productId is required to update the product"));
    }
    try{
        //checking if the product already exists in our database or not with the given productId
        const oldProduct = await Product.findOne({productId});

        //if product doesn't exists then send an error 
        if(!oldProduct){
            return next(new CustomError(400,"There is no product available in the database with given productId"));
        }

        //updating the details of a product which is associated with productId
        await Product.findOneAndUpdate({productId},{name,price,featured,company},{new:true,runValidators:true,setDefaultsOnInsert:true});

        //sending the response back to the client that the product has been updated.
        res.status(200).json({
            success : true,
            message : "Product updated Successfully",
        })
    }catch(err){
        next(err);
    }
}


// this function is used to delete a product from the database
export const deleteProduct = async(req,res,next) => {
    // taking the productId field
    const {productId} = req.params;

    if(!productId){
        return next(new CustomError(400, "Please provide the productId of the product that you want to delete"));
    }
    try{
        // checking if a product exists in our database with the given productId 
        const oldProduct = await Product.findOne({productId});

        // if product doesn't exists then send an error to the client
        if(!oldProduct){
            return next(new CustomError(400,"There is no product available in the database with given productId"));
        }

        //finding and deleting the product
        await Product.findOneAndDelete({productId});

        //sending response back to the frontend that product is deleted
        res.status(200).json({
            success : true,
            message : "Product deleted Successfully"
        })
    }catch(err){
        next(err);
    }
}


// this function is used to find all the featured products
export const featuredProducts = async(req,res,next) => {
    try{
        // finding all the featured products from the database.
        const allFeaturedProducts = await Product.find({featured : true});

        // sending the response back to the client with the list of all featured products.
        res.status(200).json({
            success : true,
            message : "Fetched all the featured products",
            featuredProducts : allFeaturedProducts
        })
    }catch(err){
        //handling the error if any occurs
        next(err);
    }
}


// this function is used to get all the products which have price less than a certain value.
export const getProductsWithPriceLessThanCertainValue = async(req,res,next) => {

    //taking the required field from the query
    const {priceFilter} = req.query;

    // if the priceFilter is not there in the query then send an error to the client.
    if(!priceFilter){
        return next(new CustomError(400, "Price Filter is required and it should be an Integer"));
    }
    try{
        //fetching all the products from the database which has price less than the priceFilter(provided to us in query)
        const products = await Product.find({price : {$lt:priceFilter}});

        //sending response back to the client with all the fetched products which  have price less than the price filter.
        res.status(200).json({
            success : true,
            message : `Fetched all the products with price less than ${priceFilter}`,
            products
        })
    }catch(err){
        //handling the error if any occurs.
        next(err);
    }
}


//this function is used to find all the products with rating more than a certain value
export const getProductsWithRatingHigherThanCertainValue = async(req,res,next) => {
    //taking the ratingFilter field from the req.query object 
    const {ratingFilter} = req.query;

    //if ratingFilter is undefined or null then send an error to the client
    if(!ratingFilter){
        return next(new CustomError(400,"ratingFilter is required and it should be between 0 and 5 inclusive"));
    }

    try{    
        // fetching all the products with rating higher than ratingFilter
        const products = await Product.find({rating : {$gt : ratingFilter}});

        //sending response back to the client with all the fetched products.
        res.status(200).json({
            success : true,
            message : `Fetched all the products with rating more than ${ratingFilter}`,
            products
        })
    }catch(err){
        next(err);
    }
}