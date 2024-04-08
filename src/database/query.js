export const query = {
  getAllProducts: `SELECT * FROM OEE_Products`,

  insertProducts: `
    INSERT INTO OEE_Products(
      pr_name,
      pr_line,
      pr_station,
      pr_baan,
      pr_units,
      created_at,
      updated_at
  )
  VALUES(
      @pr_name,
      @pr_line,
      @pr_station,
      @pr_baan,
      @pr_units,
      @created_at,
      @updated_at
)`,
  getProductById: `
  SELECT * FROM OEE_Products
  WHERE id = @id
`,
  deleteProduct: `
    DELETE FROM OEE_Products
    WHERE id = @id
`,
  countProducts: `
    SELECT COUNT(*) FROM OEE_Products
`,
  updateProductById: `
    UPDATE OEE_Products
    SET pr_name = @pr_name,
    pr_line = @pr_line,
    pr_station = @pr_station,
    pr_baan = @pr_baan,
    pr_units = @pr_units,
    created_at = @created_at,
    updated_at = @updated_at
    WHERE id = @id
`,
  getAllStations: `
  SELECT * FROM OEE_Stations
`,

  getStationById: `
  SELECT * FROM OEE_Stations
  WHERE id = @id
`,

  getAllProductsStations: `
  SELECT * FROM OEE_ProductStations
`,

getProductStationsById: `
SELECT * from OEE_ProductStations
WHERE id_stations = @id_stations
`,

  getMachinePerformance: `
  SELECT * FROM OEE_Machine_Performance
`,

  insertMachinePerformance: `
INSERT INTO OEE_Machine_Performance(
  id_products,
  id_stations,
  created_at,
  updated_at,
  passfail
)
VALUES(
  @id_products,
  @id_stations,
  @created_at,
  @updated_at,
  @passfail
)`,

insertMachinePerformanceWithDtReason: `
INSERT INTO OEE_Machine_Performance(
  id_products,
  id_stations,
  created_at,
  updated_at,
  id_dt_reason,
  dt_reason,
  dummy
)
VALUES(
  @id_products,
  @id_stations,
  @created_at,
  @updated_at,
  @id_dt_reason,
  @dt_reason,
  @dummy
)`,

  getMachinePerformanceTimeRange: `
SELECT *,
  LEAD(created_at, 1) OVER(
  ORDER BY created_at ASC) AS LEAD_created_at
FROM OEE_Machine_Performance WHERE created_at
BETWEEN @start_time AND @end_time
AND id_stations = @id
`,

  leadCreatedValue: `
SELECT *, 
       LEAD(created_at, 1) OVER(
       ORDER BY created_at ASC) AS LEAD_created_at
FROM OEE_Machine_Performance
`,

  postMachinePerformance: `
INSERT INTO OEE_Machine_Performance(
  id_products,
  id_stations,
  created_at,
  updated_at,
  passfail
)
VALUES(
  @id_products,
  @id_stations,
  @created_at,
  @updated_at,
  @passfail
)
SELECT * FROM OEE_Machine_Performance WHERE id = SCOPE_IDENTITY()`,

  getMachinePerformanceById: `
SELECT * FROM OEE_Machine_Performance
WHERE id = @id
`,

  getDownTimeReasons: `
  SELECT * FROM OEE_DT_reasons
  WHERE id_stations = @id_stations
`,

  updateDownTimeReason: `
UPDATE OEE_Machine_Performance
SET id_dt_reason = @id_dt_reason, dt_reason= @dt_reason
WHERE id=@id
SELECT * FROM OEE_Machine_Performance WHERE id = @id
`,

getAlarmByStatus: `
SELECT * FROM OEE_Support_Alarms
WHERE al_status = @al_status
`,

createsupportAlarm: `
INSERT INTO OEE_Support_Alarms(
  id_stations,
  al_status,
  created_at,
  updated_at
)
VALUES(
  @id_stations,
  @al_status,
  @created_at,
  @updated_at
)`,

getAlarmByStatusStation: `
SELECT 
	OEE_Support_Alarms.id AS AlarmId,
	OEE_Support_Alarms.id_stations,
	OEE_Support_Alarms.al_status,
	OEE_Support_Alarms.created_at AS createdAt,
	OEE_Support_Alarms.updated_at AS updatedAt,
	OEE_Stations.id,
	OEE_Stations.st_name,
	OEE_Stations.st_line,
	OEE_Stations.st_unhappy_oee,
	OEE_Stations.st_happy_oee,
	OEE_Stations.created_at,
	OEE_Stations.updated_at
FROM OEE_Support_Alarms JOIN OEE_Stations
ON OEE_Support_Alarms.id_stations= OEE_Stations.id
WHERE al_status = 1
`,

getAlarmByStatusAndStation: `
SELECT * FROM OEE_Support_Alarms
WHERE al_status = @al_status
AND id_stations = @id_stations  
`,
};


