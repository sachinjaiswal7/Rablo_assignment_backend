import mongoose from "mongoose";


const connectDb = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName : "product-database"
    }).then(() => {
        console.log("Database Connected");
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDb;