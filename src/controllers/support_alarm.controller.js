import { getConnection, sql } from "../database";
import { query } from "../database";
import transporter from "../helpers/mailer";

export const getAlarmByStatus = async (req, res) => {
    const { al_status } = req.params;
  
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("al_status", al_status)
        .query(query.getAlarmByStatus);
      console.log(result);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

export const getAlarms = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(query.getAlarms);
      console.log(result);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
}

  export const createsupportAlarm = async (req, res) => {
    const { employee, id_stations, al_status, created_at, updated_at } = req.body;

    let d = new Date();
    let dOnMiliSeconds = d.getTime();
    let hoursToSubstract = 7;
    let addMiliSeconds = 60 * 60 *1000 * hoursToSubstract;
    let currentDate = new Date(dOnMiliSeconds - addMiliSeconds);

    if (employee == null, id_stations == null || al_status == null || created_at == null || updated_at == null) {
      return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
    }

    let newDestination = {
      employee: employee,
      id_stations: id_stations,
      al_status: al_status,
      created_at: currentDate,
      updated_at: currentDate
    }

    console.log("New Alarm", newDestination )
  
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("employee", employee)
        .input("id_stations", id_stations)
        .input("al_status", al_status)
        .input("created_at",sql.DateTime, currentDate)
        .input("updated_at",sql.DateTime, currentDate)
        .query(query.createsupportAlarm);
      res.status(201).end(JSON.stringify(newDestination));
      console.log("MyRecordset", "OK");
    } catch (error) {
      res.status(500);
      res.send(error.message);
      console.log("MyRecordset", error);
    }
  };

  export const getAlarmByStatusStation = async (req, res) => {
    const { al_status } = req.params;
    console.log("Alarm Status", al_status);
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("al_status", al_status)
        .query(query.getAlarmByStatusStation);
      console.log(result);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getAlarmByStatusAndStation = async (req, res) => {
    const { al_status, id_stations } = req.params;
    console.log("Alarm Status", al_status);
    console.log("Station ID", id_stations);
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("al_status", al_status)
        .input("id_stations", id_stations)
        .query(query.getAlarmByStatusAndStation);
      console.log(result);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getLastAlarmsForEachStation = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(query.getLastAlarmsForEachStation);
      console.log("result", [].concat(...result.recordsets));
      res.json([].concat(...result.recordsets));
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const sendAlarmEmail = async (req, res) => {
    try{
      let info = transporter.sendMail({
        from: 'aguiladescalza@gmail.com',
        to: 'cesar.jimenez@flex.com',
        subject: 'Test',
        body: 'Hello World'
      })
    } catch(error){
      console.log("Error", error);
    }
    
  };