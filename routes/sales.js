import express from "express";
import {
  getAllSales,
  findSale,
  salesByLocation,
  clientsBySatisfaction,
  salesByLocMedCoup
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:_id", async (req, res) => {
  const sale = await findSale(req.params._id);
  res.json(sale);
});

router.get("/location/:location", async (req, res) => {
  const sales = await salesByLocation(req.params.location);
  res.json(sales);
});

router.get("/locMedCoup/locMedCoup", async(req, res) => {
  const location = req.query.location;
  const medio = req.query.medio;
  const coupon = req.query.coupon;
  
  const sales = await salesByLocMedCoup(location, medio, coupon);

  res.json(sales);
});

router.get("/satisfaction/satisfaction", async (req, res) => {
  const clients = await clientsBySatisfaction();
  res.json(clients);
});

export default router;
