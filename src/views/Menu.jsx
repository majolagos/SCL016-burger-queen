import React, { Fragment, useState, useEffect, useContext } from "react";
import data from "../components/menuData.json";
import dataOrderContext from "../context/dataOrderContext";
import { saveDataOrder } from "../components/Firebase";

const Menu = () => {
  const [dataMenu, setDataMenu] = useState([]); //todos los productos sin filtrar
  const [arrayMenu, setArrayMenu] = useState([]); //los productos filtrados que mostraré en el main
  const [productList, setProductList] = useState([]); //productos añadidos a la comanda
  const [total, setTotal] = useState();
  const { order } = useContext(dataOrderContext);

  useEffect(() => {
    const getMenu = () => {
      setDataMenu(data);
    };
    getMenu();
  }, []);

  const agregarProductos = (item) => {
    if (productList.length === 0) {
      setProductList([
        {
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          image: item.image,
          type: item.type,
          quantity: 1,
          subtotal: item.price,
        },
      ]);

      setTotal(item.price);
    } else {
      //existe el producto en la lista?
      const foundProduct = productList.find(
        (element) => element.id === item.id
      );

      if (foundProduct) {
        //actualizo  la cantidad
        const arrayProduct = productList.map((element) => {
          if (element.id === item.id) {
            element.quantity++;
            element.subtotal = element.quantity * element.price;
            setTotal(total + element.price);
            return element;
          }
          return element;
        });

        //actualizo el listado de productos
        console.log(arrayProduct);
        setProductList(arrayProduct);
      } else {
        //añado el producto a la lista
        setProductList([
          ...productList,
          {
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            image: item.image,
            type: item.type,
            quantity: 1,
            subtotal: item.price,
          },
        ]);
        setTotal(total + item.price);
      }
    }
  };

  const initOrder = (e) => {
    e.preventDefault();

    const waiter = order.waiter;
    const table = order.table;
    const customer = order.table;
    const dataOrder = { waiter, table, customer, total, productList };
    saveDataOrder(dataOrder);
  };

  const selectMenu = (option) => {
    setArrayMenu(dataMenu.filter((item) => item.type === option));
  };

  return (
    <Fragment>
      <main className="row mx-auto vh-100">
        <section className="col-md-3 mx-auto text-center bg-primary">
          <button
            className="btn btn-pink-light mt-4 mr-5 ml-4"
            onClick={() => selectMenu("salty")}
          >
            Salado
          </button>
          <button
            className="btn btn-pink-light mt-3 mr-5 ml-3"
            onClick={() => selectMenu("sweet")}
          >
            Dulce
          </button>
          <button
            className="btn btn-pink-light mt-3 mr-5 ml-4"
            onClick={() => selectMenu("drinkables")}
          >
            Bebestible
          </button>
        </section>
        <section className="col-md-6 mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {arrayMenu.map((item) => (
                  <div className="col-md-4 centrar" key={item.id}>
                    <div>
                      <img src={item.image} className="padding-bs-2" alt="" />
                      <h6 className="card-title text-small">{item.title}</h6>
                      <p className="txt-menu text-secondary">
                        {item.description}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">{item.price}</small>
                      </p>
                      <button
                        className="btn btn-info float-right mb-2"
                        onClick={() => agregarProductos(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="col-md-3 bg-primary">
          {" "}
          {/* Componente comanda y props */}
          <form className="text-center mt-3" onSubmit={(e) => initOrder(e)}>
            <h4>Pedido</h4>
            <ul className="list-group">
              {productList.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <small>
                    {item.title}
                    <span className="badge bg-primary rounded-pill">
                      {item.quantity}
                    </span>
                  </small>
                </li>
              ))}
            </ul>
            <span>Total: ${total}</span>
            <br />
            <button type="submit" className="btn btn-pink text-light mt-3">
              Ingresar Pedido
            </button>
          </form>
        </section>
      </main>
    </Fragment>
  );
};

export default Menu;
