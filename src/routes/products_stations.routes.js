import {Router} from 'express';
import { createProductsStations, getProductsStations } from '../controllers/products_stations.controller';


const router = Router();

//Get All prodcuts
router.get('/products_stations', getProductsStations);



//Add a product
router.post('/products_stations', createProductsStations);

//Delete a product
//router.delete('/products/:id', deleteProductById);

//Update a product
//router.put('/products/:id', updateProductById);

export default router;