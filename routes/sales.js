import express from "express";
import { getAllSales, getById, getSalesByLocation, getPorFiltrado, getClientesPorSatisfaccion } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

//ruta ejercicio1
//ruta -GET /api/sales/GetPorId/:id=[Id]
router.get("/GetPorId/:id", async (req,res) =>
  {
    try{
      const id = req.params.id;
      res.json(await getById(id));
    }catch(error){
      res.status(500).send({message: 'Error obteniendo la venta seleccionada.'})
    }
  });

    //ruta ejercicio2
  // -GET /api/sales/GetPorLocation/:location=[Locacion]
  router.get("/GetPorLocation/:location", async(req,res) =>{
    try{
      const location = req.params.location;
      res.json(await getSalesByLocation(location));
    }catch(error){
      res.status(500).send({message: 'Error filtrando las ventas por locacion.'})
    }
  });

  //ruta ejercicio3
  // -GET /api/sales/GetPorFiltrado/storeLocation=[location]&purchaseMethod=[method]&couponUsed=[true/false]
  router.get("/GetPorFiltrado/storeLocation=[location]&purchaseMethod=[method]&couponUsed=[true/false]", async(req,res) =>{
    try{
      const { storeLocation, purchaseMethod, couponUsed } = req.query;
      const filtros = {};

      if (storeLocation) query.storeLocation = storeLocation;
      if (purchaseMethod) query.purchaseMethod = purchaseMethod;
      if (couponUsed !== undefined) query.couponUsed = couponUsed;
      res.json(await getPorFiltrado(filtros));
    }catch(error){
      res.status(500).send({message: 'Error filtrando las ventas por locacion, metodo y cupones usados.'})
    }
  });

//ruta ejercicio4
  // -GET /api/sales/GetClientePorSatisfaccion
  router.get("/GetClientePorSatisfaccion",async(req, res)=>{
    try{
        res.json(await getClientesPorSatisfaccion())
    }catch(error){
      res.status(500).send({message: 'Error trayendo los clientes por satisfaccion'})
    }
  });
export default router;
