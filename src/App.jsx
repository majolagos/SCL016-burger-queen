import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Tables from "./views/Tables";
import Menu from "./views/Menu";
import Home from "./views/Home";
import Orders from "./views/Orders";
import Payments from "./views/Payments";
import Navbar from "./views/Navbar";
import UserContext from './context/userContext';
import DataOrderContext from "./context/dataOrderContext";

function App() {
  const [waiter, setName] = useState(null)
  // const setName = (value) => {
  //   setWaiter(value);
  // };
  const [order, setOrder] = useState(null)
  return (
    <UserContext.Provider value={{waiter, setName}}>
      <DataOrderContext.Provider value={{order, setOrder}}>
    <Router>
        <Navbar/>
        <Switch>
          <Route path="/mesas">
            <Tables/>
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/orden">
            <Orders />
          </Route>
          <Route path="/pago">
            <Payments />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
    </Router>
    </DataOrderContext.Provider>
  </UserContext.Provider>
  );
}
export default App;
