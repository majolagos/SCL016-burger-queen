import React, { Fragment, useState, useEffect } from "react";
import data from '../components/menuData.json'

const Menu = () => {
  const [arrayMenu, setArrayMenu] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);
  const [listadoProductos, setListadoProductos] = useState([]);
  
  useEffect(() => {

    const getMenu = () => {
      setDataMenu(data);
    }
  
    getMenu();
  }, [listadoProductos]);

  const agregarProductos = (item) =>{

    const product = JSON.parse(item)
    
    setListadoProductos([
      ...listadoProductos,
      {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        type: product.type
      }
    ]);
    
  }

  const initOrder = (e) =>{
    e.preventDefault()

    console.log(listadoProductos);
  }
  
  const selectMenu = (option) => {
      
    switch (option) {
      case "dulce":

        setArrayMenu(dataMenu.filter(item => item.type === 'sweet'));
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
              {arrayMenu.map((item) => (
                <div className="card" key={item.id}>
                  <div className="card-body">
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="card-body">
                      <h6 className="card-title text-small">{item.title}</h6>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">
                        <small className="text-muted">{item.price}</small>
                      </p>
                      <button
                        className="btn btn-info float-right"
                        onClick={() => agregarProductos(JSON.stringify(item))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-3 bg-primary">
          <form className="text-center" onSubmit={(e) => initOrder(e)}>
            <span>Pedido</span>
            <ul className="list-group"></ul>
            {listadoProductos.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.title}
                <span className="badge bg-primary rounded-pill">1</span>
              </li>
            ))}
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
