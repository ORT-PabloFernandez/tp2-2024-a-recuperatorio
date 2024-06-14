import express from "express";
import { getAllSales, getSaleById, getSalesByLocation, getSalesFilteredByLocPurMethodAndCoup, getClientsBySatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await getSaleById(id)
    console.log("ID", id)

    if (!sale) {
      res.status(404).send({ message: "Sale not found" })
    }

    res.json(sale)

  } catch (e) {
    res.status(404).send({ message: e.message })
  }
})

router.get("/location/:loc", async (req, res) => {
  try {
    const loc = req.params.loc;
    const salesLoc = await getSalesByLocation(loc);
    res.json(salesLoc)
  } catch (e) {
    res.status(404).send({ message: e.message })
  }
})

router.get("/params/data", async (req, res) => {
  const { purchaseMethod, couponUsed, storeLocation } = req.body

  if (!purchaseMethod && !couponUsed && !storeLocation) {
    res.status(400).send({ message: "Invalid parameters" })
  }

  const salesFiltered = await getSalesFilteredByLocPurMethodAndCoup(storeLocation, purchaseMethod, couponUsed);

  res.json(salesFiltered);
});

router.get("/client/satisfaction", async (req, res) => {
  try {
    res.json(await getClientsBySatisfaction())
  } catch (e) {
    res.status(404).send({ message: e.message })
  }
})

export default router;
