import React, {useState, useContext} from 'react';
import logo2 from '../images/logo2.svg';
import userContext from '../context/userContext';
import { withRouter } from 'react-router';

const Home = (props) => { //componente de funcion

const [waiter, setWaiter] = useState('');
const {name, setName} = useContext(userContext);

const initDay =  (e) =>{ 
  e.preventDefault();
  if(!waiter.trim()){
      console.log('Ingresa un usuario')
      return
  }
  setName(waiter);
  props.history.push('/mesas')
}
    return (
     
        <main className="row mx-auto vh-100">
          <section className="col-md-9 mt-4">
            <img src={logo2} alt="logo" />
          </section>
          <section className="col-md-3 bg-primary">
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
          </section>
        </main>

    );
}

export default withRouter(Home);