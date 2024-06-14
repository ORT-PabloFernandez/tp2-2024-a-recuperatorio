import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const SALES = "sales";

async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

//1. Necesitamos un endpoint que nos devuelva
//una venta (**sales**) particular por \_id

async function findSale(_id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(_id) });
  return sale;
}

// 2. Necesitamos un endpoint que nos permita filtrar
//las ventas por localización (**storeLocation**). Por emeplo
//todas las ventas de las tiendas en Seatle

async function salesByLocation(storeLocation) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const salesByLocation = sales.filter(
    (sale) => sale.storeLocation.toLowerCase() == storeLocation
  );

  return salesByLocation;
}

//3. El equipo de frontend esta preparando una pagina que permita
//filtrar tanto por localización como por el medio que se hizo la venta
//(**purchaseMethod**) y ademas si se uso un cupon (**couponUsed**)

async function salesByLocMedCoup(location, purchaseMethod, coupon) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const sale = sales.filter(
    (sale) =>
      sale.storeLocation == location &&
      sale.purchaseMethod == purchaseMethod &&
      sale.couponUsed.toString() == coupon
  );
  return sale;
}

//4. El equipo Marketing esta preparando una promoción via mail
// para los clientes mas satisfechos, y rebajas para los clientes
// mas insatisfechos. Para tal efecto, se quiere un endpoint
// que proporcione a los clientes ordenados por satisfacción
// (**satisfaction**)
// customer.satisfaction  !!!!

async function clientsBySatisfaction() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const clients = sales.map((sale) => sale.customer);

  const clientsBySatisfaction = clients.sort(
    (a, b) => a.satisfaction - b.satisfaction
  );
  return clientsBySatisfaction;
}

export {
  getAllSales,
  findSale,
  salesByLocation,
  clientsBySatisfaction,
  salesByLocMedCoup,
};
