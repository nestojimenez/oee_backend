import { getConnection, sql } from "../database";
import { query } from "../database";

export const getStations = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(query.getAllStations);
    console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStationById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("id", id)
        .query(query.getStationById);
      console.log(result);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

