import { getConnection, sql } from "../database";
import { query } from "../database";

export const getProductsStations = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(query.getAllProductsStations);
    //console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductsStationsById = async (req, res) => {
  const { id_stations } = req.params;
  //console.log(id_stations);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_stations", id_stations)
      .query(query.getProductStationsById);
    //console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const createProductsStations = async (req, res) => {
  const { pr_name, pr_line, pr_station, pr_baan,pr_units, created_at, updated_at } =
    req.body;
  
  if (
    pr_name == null ||
    pr_line == null ||
    pr_station == null ||
    pr_baan == null ||
    pr_units == null ||
    created_at == null ||
    updated_at == null
  ) {
    return res.status(400).json({ msg: "Bad rquest: Fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("pr_name", sql.VarChar, pr_name)
      .input("pr_line", sql.VarChar, pr_line)
      .input("pr_station", sql.VarChar, pr_station)
      .input("pr_baan", sql.VarChar, pr_baan)
      .input("pr_units", sql.VarChar, pr_units)
      .input("created_at", sql.DateTime, created_at)
      .input("updated_at", sql.DateTime, updated_at)
      .query(query.insertProducts);

    //console.log(result);
    res.json({ pr_name, pr_line, pr_station, pr_baan, pr_units, created_at, updated_at });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductsStationsbyProducId = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(query.getProductById);
    //console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

