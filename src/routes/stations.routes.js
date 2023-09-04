import { Router } from "express";
import { getStationById, getStations } from "../controllers/stations.controller";


const router = Router();

//Get All Stations
router.get('/stations', getStations);
//Get Stations by ID
router.get('/stations/:id', getStationById);


export default router;