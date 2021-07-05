import React, {Fragment, useState, useContext} from 'react';
import logo2 from '../images/logo2.svg';
import userContext from '../context/userContext';

const Home = () => {

const [waiter, setWaiter] = useState('');
const {name, updateName} = useContext(userContext); 
console.log(name);

const initDay = (e) =>{
  e.preventDefault();
  if(!waiter.trim()){
      console.log('Ingresa un usuario')
      return
  }
  updateName(waiter);
  //cambiar la ruta para ir a mesas
}
    return (
      <Fragment>
        <div className="row mx-auto vh-100">
          <div className="col-md-9 mt-4">
            <img src={logo2} alt="logo" />
          </div>
          <div className="col-md-3 bg-primary">
            <form onSubmit={initDay} className="text-center">
              <input
                type="text"
                name="nombreUsuario"
                className="form-control mt-4"
                placeholder="ingresa tu usuario"
                onChange={(e) => setWaiter(e.target.value)}
                value={waiter}
              />
              <button type="submit" className="btn btn-pink text-light mt-3">
                Iniciar
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
}

export default Home;