-- TABLE FOR PRODUCTS
DROP TABLE IF EXISTS [dbo].[OEE_Products];
CREATE TABLE [dbo].[OEE_Products](
    [id] int IDENTITY(1,1) PRIMARY KEY,
    [pr_name] VARCHAR(180) NOT NULL,
    [pr_line] VARCHAR(180) NOT NULL,
    [pr_station] VARCHAR(180) NOT NULL,
    [pr_baan] VARCHAR(180) NOT NULL,
    [pr_units] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
);

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
    'Cequr',
    'Simplicity',
    'Harro1',
    'B987654',
    'ea',
    convert(datetime,'18-06-12 10:34:09 PM',5),
    convert(datetime,'18-06-12 10:34:09 PM',5)
)

SELECT * FROM OEE_Products

-- TABLE FOR STATIONS
DROP TABLE IF EXISTS [dbo].[OEE_Stations];
CREATE TABLE [dbo].[OEE_Stations](
    [id] int IDENTITY(1,1) PRIMARY KEY,
    [st_name] VARCHAR(180) NOT NULL,
    [st_line] VARCHAR(180) NOT NULL,
    [st_unhappy_oee] VARCHAR(180) NOT NULL,
    [st_happy_oee] VARCHAR(180) NOT NULL,
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
);

INSERT INTO OEE_Stations(
    st_name,
    st_line,
    st_unhappy_oee,
    st_happy_oee,
    created_at,
    updated_at
)
VALUES(
    'Harro',
    'Simplicity',
    '40',
    '60',
    convert(datetime,'18-06-12 10:34:09 PM',5),
    convert(datetime,'18-06-12 10:34:09 PM',5)
)

SELECT * FROM OEE_Stations

-- TABLE FOR PRODUCTS-STATIONS
DROP TABLE IF EXISTS [dbo].[OEE_ProductStations];
CREATE TABLE [dbo].[OEE_ProductStations](
    [id] int IDENTITY(1,1) PRIMARY KEY,
    [id_products] int NOT NULL,
    [id_stations] int NOT NULL,
    FOREIGN KEY (id_products) REFERENCES OEE_Products(id),
    FOREIGN KEY (id_stations) REFERENCES OEE_Stations(id)
);

INSERT INTO OEE_ProductStations(
    id_products,
    id_stations
)
VALUES(
   '5',
   '1'
)

SELECT * FROM OEE_ProductStations

-- TABLE FOR MACHINE-PERFORMANCE
DROP TABLE IF EXISTS [dbo].[OEE_Machine_Performance];
CREATE TABLE [dbo].[OEE_Machine_Performance](
    [id] int IDENTITY(1,1) PRIMARY KEY,
    [id_products] int NOT NULL,
    [id_stations] int NOT NULL,
    FOREIGN KEY (id_products) REFERENCES OEE_Products(id),
    FOREIGN KEY (id_stations) REFERENCES OEE_Stations(id),
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
    [id_dt_reason] int,
    [dt_reason] VARCHAR(180),
    [dummy] int
);

INSERT INTO OEE_Machine_Performance(
    id_products,
    id_stations,
    created_at,
    updated_at
)
VALUES(
    '5',
    '1',
    convert(datetime,'2012-06-18T22:34:09.000Z'),
    convert(datetime,'2012-06-18T22:34:09.000Z')
);

-- Place the last created_at on the row before at LEAD_created_at
SELECT *, 
       LEAD(created_at, 1) OVER(
       ORDER BY created_at ASC) AS LEAD_created_at
FROM dbo.OEE_Machine_Performance

-- TABLE FOR DOWNTIME  REASONS
DROP TABLE IF EXISTS [dbo].[OEE_DT_reasons];
CREATE TABLE [dbo].[OEE_DT_reasons](
    [id] int IDENTITY(1,1) PRIMARY KEY,
    [id_stations] int NOT NULL,
    FOREIGN KEY (id_stations) REFERENCES OEE_Stations(id),
    [dt_reasons] VARCHAR(180) NOT NULL,
    [dt_code] int NOT NULL,
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
);

INSERT INTO OEE_DT_reasons(
    id_stations,
    dt_reasons,
    dt_code,
    created_at,
    updated_at
)
VALUES(
    '2',
    'St1, Mala colocacion de septum',
    405,
    convert(datetime,'2012-06-18T22:34:09.000Z'),
    convert(datetime,'2012-06-18T22:34:09.000Z')
);

-- TABLE FOR SUPPORT ALARMS
DROP TABLE IF EXISTS [dbo].[OEE_Support_Alarms];
CREATE TABLE [dbo].[OEE_Support_Alarms](
    [id] int IDENTITY(1,1) PRIMARY KEY,
    [employee] int NOT NULL,
    [id_stations] int NOT NULL,
	[al_status] int NOT NULL,
    FOREIGN KEY (id_stations) REFERENCES OEE_Stations(id),
    FOREIGN KEY (employee) REFERENCES OEE_Support_Alarms_Users(id),
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
);

--Get all alarms by al_status together with station definition
SELECT * FROM OEE_Support_Alarms
INNER JOIN OEE_Stations
ON OEE_Support_Alarms.id_stations = OEE_Stations.id
WHERE al_status = 1

-- TABLE FOR Alarms Users
DROP TABLE IF EXISTS [dbo].[OEE_Support_Alarms_Users];
CREATE TABLE [dbo].[OEE_Support_Alarms_Users](
    [id] int IDENTITY(1,1) PRIMARY KEY,
    [user_name] VARCHAR(180) NOT NULL,
    [user_lastname] VARCHAR(180) NOT NULL,
    [user_employee_no] int NOT NULL,
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
);

--Alarms Users insert user
INSERT INTO OEE_Support_Alarms_Users(
    user_name,
    user_lastname,
    user_employee_no,
    created_at,
    updated_at
)
VALUES(
    'Cesar',
    'Jimenez',
    1091153,
    convert(datetime,'2012-06-18T22:34:09.000Z'),
    convert(datetime,'2012-06-18T22:34:09.000Z')
);

--Get Latest Alarms of all Stations
DECLARE @stations INT = 1
WHILE @stations < 9
BEGIN
SELECT DISTINCT TOP (1) 
	OEE_Support_Alarms.id AS AlarmId,
	OEE_Support_Alarms.employee,
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
  ON OEE_Support_Alarms.id_stations = OEE_Stations.id
  WHERE id_stations = @stations
  ORDER BY AlarmId DESC
  SET @stations = @stations +1
  END;