import { getConnection, sql } from "../database";
import { query } from "../database";

const hourToCurrentDate = (hour, date, shift) => {
  const today = new Date();
  //console.log('Horas y dias', hour, date);
  let day = date.slice(6, 8);
  //console.log("Day: ", day);
  const month = (Number(date.slice(4, 6)) - 1).toString(); //Months start on 0 = January
  //console.log(date);
  const year = date.slice(0, 4);
  //console.log("Year: ", month);
  //Review if is a night shift and adapt date
  if (hour === '07' && shift === 'N') {
    //console.log('Es turno de la noche');
    day = '0' + (Number(day) +1).toString();
    //console.log('Year', day);
    
  }
  //////////////////////////////////////////////////////////////////////////////
  const timeString = `${hour}:00`; //"03:37";
  //console.log(timeString);
  // Use the substring() function to extract hours and minutes
  const hours = timeString.substring(0, 2);
  const minutes = timeString.substring(3, 5);
  //console.log('Horas y minutios reales', hours, minutes);
  // Use the setHours() function to assign hours and minutes
  // to the "today" date object
  const modifiedDate = subtractHours(
    new Date(today.setHours(hours, minutes, 0, 0)),
    7 /////Cuando hay cambio de horario este valor es 7 para verano y 8 para invierno///////////////////////////
  );
  modifiedDate.setFullYear(year, month, day);
  //if(hours === '06'){
    console.log('Date to search', modifiedDate);
  //}
  
  return modifiedDate;
};

function subtractHours(date, hours) {
  //console.log('Date', date);
  date.setHours(date.getHours() - hours);
  //console.log('Date', date);
  const newDate = new Date(date);
  //console.log('New Date', newDate);
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
  const { id_products, id_stations, created_at, updated_at, passfail} = req.body;
 //console.log(passfail);
  if (
    id_products == null ||
    id_stations == null ||
    created_at == null ||
    updated_at == null ||
    passfail == null 
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
      .input("passfail", passfail)
      .query(query.insertMachinePerformance);

    //console.log(result);
    res.json({
      id_products,
      id_stations,
      created_at,
      updated_at,
      passfail
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createMachinePerformanceWithDtReason = async(req, res)=> {
  const { id_products, id_stations, created_at, updated_at, id_dt_reason, dt_reason, dummy} = req.body;
  //console.log(dummy);
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
  console.log("Parameters from Reqxxxx: ", start_time, end_time);
  let shift = 'D';

  if(start_time === '06' && end_time === '07'){
    shift = 'N';
    start_time = hourToCurrentDate(start_time, date, shift);
    end_time = hourToCurrentDate(end_time, date, shift);
  }else{
    start_time = hourToCurrentDate(start_time, date, shift);
    end_time = hourToCurrentDate(end_time, date, shift);
  }
 
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
  let { id_products, id_stations, created_at, updated_at, passfail } = req.params;
  //console.log(id_products, id_stations, created_at, updated_at, passfail);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_products", sql.Int, id_products)
      .input("id_stations", sql.Int, id_stations)
      .input("created_at", sql.DateTime, created_at)
      .input("updated_at", sql.DateTime, updated_at)
      .input("passfail", sql.Int, passfail)
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
