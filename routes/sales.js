import express from "express";
import {
  getAllSales,
  getClientsSatisfaction,
  getSaleById,
  getSalesByLocation,
  getSalesFiltered,
} from "../data/sales.js";

const router = express.Router();

// Devuelve un array de clientes (especifica datos del cliente y satisfacción).
router.get("/clientsatisfaction", async (req, res) => {
  res.json(await getClientsSatisfaction());
});

// Devuelve un array de las ventas que corresponden a la ubicación y metodo de compra compartidos por query.
router.get("/filter", async (req, res) => {
  try {
    const storeLocation = req.query.storeLocation;
    const purchaseMethod = req.query.purchaseMethod;
    res.json(await getSalesFiltered(storeLocation, purchaseMethod));
  } catch (undefined) {
    console.log(
      "Se requiere ingresar storeLocation y purchaseMethod por query."
    );
  }
});

// Devuelve un array de las ventas que corresponden a la ubicación compartida por parametro.
router.get("/location/:storeLocation", async (req, res) => {
  res.json(await getSalesByLocation(req.params.storeLocation));
});

// Devuelve una venta de acuerdo a un id compartido por parametro.
router.get("/:id", async (req, res) => {
  res.json(await getSaleById(req.params.id));
});

// Devuelve el array de todas las ventas en la db.
router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

export default router;
