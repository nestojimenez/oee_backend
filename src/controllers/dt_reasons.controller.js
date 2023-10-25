import { getConnection, sql } from "../database";
import { query } from "../database";

export const getDownTimeReasons = async (req, res) => {
    const {id_stations} = req.params;
    try {
      const pool = await getConnection();
      const result = await pool.request()
      .input("id_stations", id_stations)
      .query(query.getDownTimeReasons);
      //console.log(result);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const updateDownTimeReason = async (req, res) => {
    const {id, id_dt_reason, dt_reason, } = req.body;

    try {
      const pool = await getConnection();
      const result = await pool.request()
      .input("id", id)
      .input("id_dt_reason", id_dt_reason)
      .input("dt_reason", dt_reason)
      .query(query.updateDownTimeReason);
      //console.log('My recordset', result.recordset);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }