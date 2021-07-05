import { firebase } from "../config";

const getDataTables = async () => {
  const db = firebase.firestore();
  const data = await db.collection("mesas").get();
  return data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getDataOrders = async () => {
  const db = firebase.firestore();
  const data = await db.collection("pedidos").get();
  return data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export {getDataTables, getDataOrders}
