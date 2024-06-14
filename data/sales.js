import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

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

//Funcion ejercicio1
async function getById(id){
  const connectiondb = await getConnection()
  const sales = await connectiondb
        .db(DATABASE)
        .collection(SALES)
        .findOne({ _id : new ObjectId(id) });
  return sales;
}

//Funcion ejercicio2
async function getSalesByLocation(location){
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: location})
    .toArray();
    return sales;
}

//Funcion ejercicio3 
async function getPorFiltrado(filtros){
  const connectiondb = await getConnection();
  const sales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find(sale => sale.storeLocation.equals(filtros.storeLocation) &&
            sale.purchaseMethod.equals(filtros.purchaseMethod) &&
            sale.couponUsed === filtros.couponUsed)
      .toArray();
  return sales;
}

async function getClientesPorSatisfaccion(){
  const connectiondb = await getConnection();
  const sales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find(d=>d.customer)
      .sort({satisfaction : -1})
      .toArray();
      return sales;
}
export { getAllSales, getById,getSalesByLocation, getPorFiltrado, getClientesPorSatisfaccion };
