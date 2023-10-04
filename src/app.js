import express from 'express';
import config from './config.js'
import cors from '../node_modules/cors'

import productsRoutes from './routes/products.routes.js'
import stationsRoutes from './routes/stations.routes.js'
import productsStationsRoutes from './routes/products_stations.routes.js'
import machinePerformance from './routes/machine_performance.routes.js'
import dtReasons from './routes/dt_reasons.routes.js'

const app = express();

//Settings
app.set('port', config.port);
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//app.use(cors);

app.use(productsRoutes);
app.use(stationsRoutes);
app.use(productsStationsRoutes);
app.use(machinePerformance);
app.use(dtReasons);

export default app