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