import React, { Fragment, useEffect, useState, useContext } from "react";
import {  getDataTables,  getDataOrders} from "../components/Firebase";
import userContext from "../context/userContext";
import dataOrderContext from "../context/dataOrderContext";
import "../css/Tables.css";
import { withRouter } from "react-router";

const Tables = (props) => {
  const [onePerson, setOnePerson] = useState([]);
  const [twoPersons, setTwoPersons] = useState([]);
  const [fourPersons, setFourPersons] = useState([]);
  const [arrayTables, setArrayTables] = useState([]); //mesas a mostrar en main segun en filtro
  const [customerName, setCustomerName] = useState("");
  const [arrayOrder, setArrayOrder] = useState([]);
  const [tableSelected, setTableSelected] = useState(null);
  const { waiter } = useContext(userContext);
  const { order, setOrder } = useContext(dataOrderContext);

  useEffect(() => {
    const getTables = () => {
      try {
        //esto deberia traerlo de un componente

        getDataTables().then((data) => {
          setOnePerson(data.filter((item) => item.capacidad === 1));
          setTwoPersons(data.filter((item) => item.capacidad === 2));
          setFourPersons(data.filter((item) => item.capacidad === 4));
          setArrayTables(data.filter((item) => item.capacidad === 1)); //asigno valor por defecto
        });
      } catch (error) {
        console.log(error);
      }
    };

    const loopOrders = () => {
      try {
        getDataOrders().then((data) => {
          setArrayOrder(data.filter((item) => item.estado !== "Completado"));
        });
      } catch (error) {
        console.log(error);
      }
    };

    getTables();
    loopOrders();
  }, []);

  const selectCapacity = (capacity) => {
    switch (capacity) {
      case 1:
        setArrayTables(onePerson);
        break;
      case 2:
        setArrayTables(twoPersons);
        break;
      case 4:
        setArrayTables(fourPersons);
        break;
      default:
        console.log("error");
    }
  };

  const initOrder = (e) => {
    e.preventDefault();
     if (!customerName.trim()) {
       console.log("Ingresa el cliente");
       return;
     }
    setOrder({
      waiter: waiter,
      customer: customerName,
      table: tableSelected
    })
console.log(order);
    props.history.push("/menu");
  };

  return (
    <Fragment>
      <main className="row mx-auto vh-100">
        <section className="col-md-3 mx-auto text-center bg-primary">
          <button
            className="btn btn-pink-light mt-4"
            onClick={() => selectCapacity(1)}
          >
            1 personas
          </button>
          <button
            className="btn btn-pink-light mt-3"
            onClick={() => selectCapacity(2)}
          >
            2 personas
          </button>
          <button
            className="btn btn-pink-light mt-3"
            onClick={() => selectCapacity(4)}
          >
            4 personas
          </button>
        </section>
        <section className="col-md-6 mt-4">
          {arrayOrder.map((order) =>
            arrayTables.map((item) =>
              order.mesa === item.nombreMesa ? (
                <button
                  className="btn btn-warning disabled mr-3 mt-2 ml-2"
                  key={item.id}
                >
                  {item.nombreMesa}
                </button>
              ) : (
                <button
                  className="btn btn-light-blue mr-3 mt-2 ml-2"
                  key={item.id}
                  onClick={() => setTableSelected(item.nombreMesa)}
                >
                  {item.nombreMesa}
                </button>
              )
            )
          )}
        </section>
        <section className="col-md-3 bg-primary">
          <form onSubmit={initOrder} className="text-center">
            <input
              type="text"
              name="nombreCliente"
              className="form-control mr-3 mt-4"
              placeholder="nombre cliente"
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
            />
            <button type="submit" className="btn btn-pink text-light mt-3">
              Comenzar
            </button>
          </form>
        </section>
      </main>
    </Fragment>
  );
};

export default withRouter(Tables);
