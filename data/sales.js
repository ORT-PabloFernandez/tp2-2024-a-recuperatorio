import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

export async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return sales;
}
/*
1) Necesitamos un endpoint que nos devuelva una venta (sales) particular por _id
2) Necesitamos un endpoint que nos permita filtrar las ventas por localización (storeLocation). 
Por emeplo todas las ventas de las tiendas en Seatle (corrección: Seattle)
3) El equipo de frontend esta preparando una pagina que permita filtrar tanto por localización como 
por el medio que se hizo la venta (purchaseMethod) y ademas si se uso un cupon (couponUsed)
4) El equipo Marketing esta preparando una promoción via mail para los clientes mas satisfechos, y rebajas para los clientes mas insatisfechos. 
Para tal efecto, se quiere un endpoint que proporcione a los clientes ordenados por satisfacción (satisfaction)
*/

// Devuelve una venta de acuerdo a un id compartido por parametro.
export async function getSaleById(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });

  return sale;
}

// Devuelve un array de las ventas que corresponden a la ubicación compartida por parametro.
export async function getSalesByLocation(storeLocation) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ storeLocation: storeLocation })
    .toArray();

  return sales;
}

// Devuelve un array de las ventas que corresponden a la ubicación y metodo de compra compartidos por query.
export async function getSalesFiltered(storeLocation, purchaseMethod) {
  const couponUsedState = true; // Lo hago de esta forma, porque en el futuro podría desearse que se busque por las que no se utilizó cupon.
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      storeLocation: storeLocation,
      purchaseMethod: purchaseMethod,
      couponUsed: couponUsedState,
    })
    .toArray();

  return sales;
}

// Devuelve un array de clientes (especifica datos del cliente y satisfacción).
export async function getClientsSatisfaction() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .toArray();
  const clients = sales
    .map((sale) => ({
      client: sale.customer,
      satisfaction: sale.satisfaction,
    }))
    .sort((a, b) => b.client.satisfaction - a.client.satisfaction);
  return clients;
}
