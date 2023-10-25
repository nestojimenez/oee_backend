import {Router} from 'express';
import { createMachinePerformance, getMachinePerformance, getMachinePerformanceById, getMachinePerformanceTimeRange, leadCreatedValue, postMachinePerformance, createMachinePerformanceWithDtReason } from '../controllers/machine_performance.controller';


const router = Router();

//Get All prodcuts
router.get('/machine_performance', getMachinePerformance);

router.get('/machine_performance/date_range/:start_time/:end_time/:date/:id', getMachinePerformanceTimeRange)

router.get('/machine_performance/post/:id_products/:id_stations/:created_at/:updated_at', postMachinePerformance)

//Get Machine performance by ID
router.get('/machine_performance/id/:id', getMachinePerformanceById);
//Lead Created Value
router.get('/machine_performance/lead_created_value', leadCreatedValue);

//Add a product
router.post('/machine_performance', createMachinePerformance);

router.post('/machine_performance_with_dt_reason', createMachinePerformanceWithDtReason)

//Delete a product
//router.delete('/products/:id', deleteProductById);

//Update a product
//router.put('/products/:id', updateProductById);

export default router;