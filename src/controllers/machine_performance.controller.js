import { getConnection, sql } from "../database";
import { query } from "../database";

const hourToCurrentDate = (hour, date) => {
  const today = new Date();

  const day = date.slice(6, 8);
  const month = (Number(date.slice(4, 6)) - 1).toString(); //Months start on 0 = January
  //console.log(date);
  const year = date.slice(0, 4);
  //console.log("Year: ", month);

  const timeString = `${hour}:00`; //"03:37";
  //console.log(timeString);
  // Use the substring() function to extract hours and minutes
  const hours = timeString.substring(0, 2);
  const minutes = timeString.substring(3, 5);

  // Use the setHours() function to assign hours and minutes
  // to the "today" date object
  const modifiedDate = subtractHours(
    new Date(today.setHours(hours, minutes, 0, 0)),
    7
  );
  modifiedDate.setFullYear(year, month, day);
  //console.log('Date to search', modifiedDate);
  return modifiedDate;
};

function subtractHours(date, hours) {
  date.setHours(date.getHours() - hours);
  const newDate = new Date(date);
  return newDate;
}

export const getMachinePerformance = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(query.getMachinePerformance);
    //console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createMachinePerformance = async (req, res) => {
  const { id_products, id_stations, created_at, updated_at} = req.body;
 
  if (
    id_products == null ||
    id_stations == null ||
    created_at == null ||
    updated_at == null
  ) {
    return res.status(400).json({ msg: "Bad request: Fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_products", sql.VarChar, id_products)
      .input("id_stations", sql.VarChar, id_stations)
      .input("created_at", sql.DateTime, created_at)
      .input("updated_at", sql.DateTime, updated_at)
      .query(query.insertMachinePerformance);

    //console.log(result);
    res.json({
      id_products,
      id_stations,
      created_at,
      updated_at,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createMachinePerformanceWithDtReason = async(req, res)=> {
  const { id_products, id_stations, created_at, updated_at, id_dt_reason, dt_reason, dummy} = req.body;
  console.log(dummy);
  if (
    id_products == null ||
    id_stations == null ||
    created_at == null ||
    updated_at == null
  ) {
    return res.status(400).json({ msg: "Bad request: Fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_products", sql.VarChar, id_products)
      .input("id_stations", sql.VarChar, id_stations)
      .input("created_at", sql.DateTime, created_at)
      .input("updated_at", sql.DateTime, updated_at)
      .input("id_dt_reason", id_dt_reason)
      .input("dt_reason", dt_reason)
      .input("dummy", dummy)
      .query(query.insertMachinePerformanceWithDtReason);

    //console.log(result);
    res.json({
      id_products,
      id_stations,
      created_at,
      updated_at,
      id_dt_reason,
      dt_reason,
      dummy
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getMachinePerformanceTimeRange = async (req, res) => {
  let { start_time, end_time, date, id } = req.params;
  //console.log("Parameters from Req: ", start_time, end_time);
  start_time = hourToCurrentDate(start_time, date);
  end_time = hourToCurrentDate(end_time, date);
  //console.log("Parameters from Req: ", start_time, end_time);

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("start_time", sql.DateTime, start_time)
      .input("end_time", sql.DateTime, end_time)
      .input("id", sql.Int, id)
      .query(query.getMachinePerformanceTimeRange);
    //console.log(result.recordset);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const leadCreatedValue = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(query.leadCreatedValue);
    //console.log(result.recordset);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const postMachinePerformance = async (req, res) => {
  let { id_products, id_stations, created_at, updated_at } = req.params;
  console.log(id_products, id_stations, created_at, updated_at);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_products", sql.Int, id_products)
      .input("id_stations", sql.Int, id_stations)
      .input("created_at", sql.DateTime, created_at)
      .input("updated_at", sql.DateTime, updated_at)
      .query(query.postMachinePerformance);
    //console.log(result.recordset);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getMachinePerformanceById = async (req, res) => {
  const {id}= req.params;
  try {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("id", id)
    .query(query.getMachinePerformanceById);
    //console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
