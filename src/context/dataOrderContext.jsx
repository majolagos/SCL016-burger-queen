import { createContext } from "react";

const dataOrderContext = createContext({
  waiter: null,
  customer: null,
  table: null
});

export default dataOrderContext;
