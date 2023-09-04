import {Router} from 'express';
import { getProducts, createProduct, getProductById, deleteProductById, countProducts, updateProductById } from '../controllers/products.controller';

const router = Router();

//Get All prodcuts
router.get('/products', getProducts);
//Count how many products exist
router.get('/products/count', countProducts);
//Get sigle product by ID
router.get('/products/:id', getProductById);


//Add a product
router.post('/products', createProduct);

//Delete a product
router.delete('/products/:id', deleteProductById);

//Update a product
router.put('/products/:id', updateProductById);

export default router;