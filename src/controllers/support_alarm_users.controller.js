import { getConnection, sql } from "../database";
import { query } from "../database";

export const getAlarmsUsers = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(query.getAlarmsUsers);
      console.log(result);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
}

export const getAlarmsUsersByEmployeeNo = async(req, res) => {
    const { user_employee_no } = req.params;
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('user_employee_no', sql.Int, user_employee_no)
        .query(query.getAlarmsUsersByEmployeeNo);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
}