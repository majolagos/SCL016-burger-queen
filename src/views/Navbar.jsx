import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/App.css";
import logo from "../images/logo.png";
import userContext from "../context/userContext";

const Navbar = () => {

  const today = new Date();
  const date = today.getUTCDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear(); //+' '+ today.getHours()+':'+today.getMinutes()
  const {waiter} = useContext(userContext);
  return (
    
      <nav className="navbar-dark bg-primary ">
        <div className="row">
          <div className="col-md-3">
            <Link className="navbar-brand bg-pink" to="/">
              <img src={logo} width="auto" height="19.3rem" alt="" />
            </Link>
          </div>

          <div className="col-md-6">
            <div className="btn-group">
              <div className="d flex">
                <NavLink className="btn btn-primary h-100 w-132" to="/" exact>
                  Inicio
                </NavLink>

                <NavLink className="btn btn-primary" to="/mesas" exact>
                  Mesas
                </NavLink>

                <NavLink className="btn btn-primary" to="/menu" exact>
                  Menu
                </NavLink>

                <NavLink className="btn btn-primary" to="/orden" exact>
                  Pedido
                </NavLink>
                <NavLink className="btn btn-primary mr-2" to="/pago" exact>
                  Pago
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="navbar-brand bg-primary text-dark mr-2 disabled">
              {date} -
              {waiter}
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
