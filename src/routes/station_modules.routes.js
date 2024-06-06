import {Router} from 'express';
import { getStationsModulesByStationId, getStationsModules, getStationsModulesByStationLine } from '../controllers/station_modules.controller';


const router = Router();

//Get All Stations Modules
router.get('/station_modules', getStationsModules);

//Get All Station Modules by ID
router.get('/station_modules/:id_stations', getStationsModulesByStationId);

//Get All Station Modules by Line
router.get('/station_modules/line/:st_line', getStationsModulesByStationLine);

//Update DownTime reason on MachinePerformance Table
//router.post('/downtime_reasons/update', updateDownTimeReason)

export default router