import express from "express"
import { addProduct, deleteProduct, featuredProducts, getAllProduct, getProductsWithPriceLessThanCertainValue, getProductsWithRatingHigherThanCertainValue, updateProduct } from "../controllers/productController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add", isAuthenticated, addProduct)
router.get("/all", isAuthenticated, getAllProduct);
router.put("/update", isAuthenticated, updateProduct);
router.delete("/delete/:productId", isAuthenticated, deleteProduct);
router.get("/featured", isAuthenticated, featuredProducts);
router.get("/price",isAuthenticated,getProductsWithPriceLessThanCertainValue);
router.get("/rating",getProductsWithRatingHigherThanCertainValue);

export default router;