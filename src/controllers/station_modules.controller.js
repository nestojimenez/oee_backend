import { getConnection, sql } from "../database";
import { query } from "../database";

export const getStationsModulesByStationId = async (req, res) => {
  const { id_stations } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_stations", id_stations)
      .query(query.getStationsModulesByStationId);
    //console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStationsModules = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(query.getAllStationsModules);
    //console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStationsModulesByStationLine = async (req, res) => {
  const { st_line } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("st_line", st_line)
      .query(query.getStationsModulesByStationLine);
    //console.log(result);
    res.json(result.recordsets[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
