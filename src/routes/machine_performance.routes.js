import {Router} from 'express';
import { createMachinePerformance, getMachinePerformance, getMachinePerformanceTimeRange, leadCreatedValue } from '../controllers/machine_performance.controller';


const router = Router();

//Get All prodcuts
router.get('/machine_performance', getMachinePerformance);

router.get('/machine_performance/date_range/:start_time/:end_time/:date', getMachinePerformanceTimeRange)

//Lead Created Value
router.get('/machine_performance/lead_created_value', leadCreatedValue);

//Add a product
router.post('/machine_performance', createMachinePerformance);

//Delete a product
//router.delete('/products/:id', deleteProductById);

//Update a product
//router.put('/products/:id', updateProductById);

export default router;