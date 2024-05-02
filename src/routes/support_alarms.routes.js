import { Router } from "express";
import { sendAlarmEmail, getAlarmByStatus, createsupportAlarm, getAlarmByStatusStation, getAlarmByStatusAndStation, getAlarms, getLastAlarmsForEachStation } from "../controllers/support_alarm.controller";


const router = Router();

//Get all Alarms
router.get('/support_alarm', getAlarms);

//Get Alarm by Status
router.get('/support_alarm/:al_status', getAlarmByStatus);

//Get Last Alarm for each station
router.get('/support_alarm_last', getLastAlarmsForEachStation);

//Get Alarms by Status together with stations definition
router.get('/support_alarm_station/:al_status', getAlarmByStatusStation);

//Get Alarms by Status and station ID
router.get('/support_alarm/:al_status/:id_stations', getAlarmByStatusAndStation);

//Insert support alarm
router.post('/support_alarm', createsupportAlarm);

//Send Alarm Email
router.get('/support_alarm_email', sendAlarmEmail);


export default router;