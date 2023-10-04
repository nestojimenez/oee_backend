import {Router} from 'express';
import { getDownTimeReasons, updateDownTimeReason } from '../controllers/dt_reasons.controller';


const router = Router();

//Get All prodcuts
router.get('/downtime_reasons/:id_stations', getDownTimeReasons);

//Update DownTime reason on MachinePerformance Table
router.post('/downtime_reasons/update', updateDownTimeReason)

export default router