import { Router } from "express";
import { getAlarmsUsers, getAlarmsUsersByEmployeeNo } from "../controllers/support_alarm_users.controller";


const router = Router();

//Get all Alarms User
router.get('/support_alarm_users', getAlarmsUsers);

//Get all Alarms User by Employee ID
router.get('/support_alarm_users/employee_no/:user_employee_no', getAlarmsUsersByEmployeeNo);

/*//Get Alarm by Status
router.get('/support_alarm/:al_status', getAlarmByStatus);

//Get Alarms by Status together with stations definition
router.get('/support_alarm_station/:al_status', getAlarmByStatusStation);

//Get Alarms by Status and station ID
router.get('/support_alarm/:al_status/:id_stations', getAlarmByStatusAndStation);

//Insert support alarm
router.post('/support_alarm', createsupportAlarm);*/


export default router;