import { Router } from "express";
import { getAlarmByStatus, createsupportAlarm, getAlarmByStatusStation, getAlarmByStatusAndStation } from "../controllers/support_alarm.controller";


const router = Router();

//Get Alarm by Status
router.get('/support_alarm/:al_status', getAlarmByStatus);

//Get Alarms by Status together with stations definition
router.get('/support_alarm_station/:al_status', getAlarmByStatusStation);

//Get Alarms by Status and station ID
router.get('/support_alarm/:al_status/:id_stations', getAlarmByStatusAndStation);

//Insert support alarm
router.post('/support_alarm', createsupportAlarm);


export default router;