import { getConnection, sql } from "../database";
import { query } from "../database";

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

  export const createsupportAlarm = async (req, res) => {
    const { id_stations, al_status, created_at, updated_at } = req.body;
  
    if (id_stations == null || al_status == null || created_at == null || updated_at == null) {
      return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
    }

    let newDestination = {
      id_stations: id_stations,
      al_status: al_status,
      created_at: new Date(),
      updated_at: new Date()
    }

    console.log("New Alarm", newDestination )
  
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("id_stations", id_stations)
        .input("al_status", al_status)
        .input("created_at",sql.DateTime, new Date())
        .input("updated_at",sql.DateTime, new Date())
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
  }