import React, { Fragment, useState, useEffect } from "react";
import data from "../components/menuData.json";

const Menu = () => {
  const [arrayMenu, setArrayMenu] = useState([]); //los productos filtrados que mostrare en el main
  const [dataMenu, setDataMenu] = useState([]); //todos los productos sin filtrar
  const [listadoProductos, setListadoProductos] = useState([]); //productos añadidos a la comanda
  const [total, setTotal] = useState();

  useEffect(() => {
    const getMenu = () => {
      setDataMenu(data);
    };

    getMenu();
  }, []);

  const agregarProductos = (item) => {

    if (listadoProductos.length === 0) {
      setListadoProductos([
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

      setTotal(item.price)
    } else {
      //existe el producto en la lista?
      const foundProduct = listadoProductos.find(
        (element) => element.id === item.id
      );

      if (foundProduct) {
        //actualizo  la cantidad
        const arrayProduct = listadoProductos.map((element) => {
          if (element.id === item.id) {
            element.quantity++;
            element.subtotal = element.quantity * element.price
            setTotal(total+element.subtotal);
            return element;
          }

          return element;
        });

        //actualizo el listado de productos      
        console.log(arrayProduct);  
        setListadoProductos(arrayProduct);

      } else {
        //añado el producto a la lista
        setListadoProductos([
          ...listadoProductos,
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
        setTotal(total+item.price);
      }
    }
  };

  const initOrder = (e) => {
    e.preventDefault();

    console.log(listadoProductos);
  };

  const selectMenu = (option) => {
    switch (option) {
      case "dulce":
        setArrayMenu(dataMenu.filter((item) => item.type === "sweet"));
        console.log("cargo menu dulce");
        break;
      case "salado":
        setArrayMenu(dataMenu.filter((item) => item.type === "salty"));
        console.log("cargo menu salado");
        break;
      case "bebestibles":
        setArrayMenu(dataMenu.filter((item) => item.type === "drinkables"));
        console.log("cargo menu bebestibles");
        break;
      default:
        console.log("error");
    }
  };
  return (
    <Fragment>
      <div className="row mx-auto vh-100">
        <div className="col-md-3 mx-auto text-center bg-primary">
          <button
            className="btn btn-pink-light mt-4 mr-5 ml-4"
            onClick={() => selectMenu("salado")}
          >
            Salado
          </button>
          <button
            className="btn btn-pink-light mt-3 mr-5 ml-3"
            onClick={() => selectMenu("dulce")}
          >
            Dulce
          </button>
          <button
            className="btn btn-pink-light mt-3 mr-5 ml-4"
            onClick={() => selectMenu("bebestibles")}
          >
            Bebestible
          </button>
        </div>
        <div className="col-md-6 mt-4">
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
        </div>
        <div className="col-md-3 bg-primary">
          {" "}
          {/* Componente comanda y props */}
          <form className="text-center mt-3" onSubmit={(e) => initOrder(e)}>
            <h4>Pedido</h4>
            <ul className="list-group">
              {listadoProductos.map((item, index) => (
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
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
