import { firebase } from "../config";
import moment from "moment";
import "moment/locale/es";

const db = firebase.firestore();
const today = new Date();
let id = "";

const getDataTables = async () => {
  const data = await db.collection("mesas").get();
  return data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getDataOrders = async () => {
  const data = await db.collection("pedidos").get();
  return data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const saveDataOrder = async (dataOrder) => {
  try {
    const newOrder = {
      garzona: dataOrder.waiter,
      mesa: dataOrder.table,
      nombreCliente: dataOrder.customer,
      fecha: moment(today).format('LL'),
      estado: 'Ingresado',
      productos: dataOrder.productList,
      total: dataOrder.total
    };

    await db.collection("pedidos").add(newOrder);
    const order = getDataOrders().then((data) => {
      return data.filter(
        (order) =>
          order.garzona === dataOrder.waiter &&
          order.fecha === moment(today).format("LL") &&
          order.nombreCliente === dataOrder.customerName
      );
    });

    order.then((item) => {
      id = item[0].id;
      return console.log(id);
    });
  } catch (error) {
    console.log(error);
  }
};

export { getDataTables, getDataOrders, saveDataOrder };
