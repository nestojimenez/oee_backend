import sql from "mssql";

const dbSettings = {
  server: "lmente800",
  user: "fftesting",
  password: "Fl3xflow01",
  database: "t_bxt_otay_20",
  options: {
    encrypt: false,
    trusServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export {sql};

