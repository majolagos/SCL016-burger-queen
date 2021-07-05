import React, {
  Fragment,
  useEffect,
  useState,
  useContext
} from "react";

import { getDataTables, getDataOrders } from "../components/Firebase";
import userContext from "../context/userContext";
import '../css/Tables.css';


const Tables = () => {
  
  const [onePerson, setOnePerson] = useState([]);
  const [twoPersons, setTwoPersons] = useState([]);
  const [fourPersons, setFourPersons] = useState([]);
  const [arrayTables, setArrayTables] = useState([]); //mesas a mostrar en main segun en filtro
  const [customerName, setCustomerName] = useState("");
  const [arrayOrder, setArrayOrder] = useState([]);
  const [tableSelected, setTableSelected] = useState(null);
  const { waiter } = useContext(userContext);
 

  useEffect(() => {
    const getTables =  () => {
      try { //esto deberia traerlo de un componente
        
        getDataTables().then(data =>{
        setOnePerson(data.filter((item) => item.capacidad === 1));
        setTwoPersons(data.filter((item) => item.capacidad === 2));
        setFourPersons(data.filter((item) => item.capacidad === 4)); //asigno valor por defecto
        setArrayTables(data.filter((item) => item.capacidad === 1));        
            
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
          console.log("cargo mesas de 1");
          break;
        case 2: 
          setArrayTables(twoPersons);
          console.log("cargo mesas de 2");
          break; 
        case 4:
          setArrayTables(fourPersons);
          console.log("cargo mesas de 4");
          break;
        default:
          console.log("error");
      }
  }

  const initOrder = (e) =>{

    e.preventDefault();

    //valido el nombre del usuario
    console.log(customerName);

    console.log(tableSelected);
    console.log(waiter);
  
    
    
    // aqui guardo los datos del pedido en firebase
    // nombre garzona + nombre de la mesa

  }


  return (
    <Fragment>
      <div className="row mx-auto vh-100">
        <div className="col-md-3 mx-auto text-center bg-primary">
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
        </div>
        <div className="col-md-6 mt-4">
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
        </div>
        <div className="col-md-3 bg-primary">
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
        </div>
      </div>
    </Fragment>
  );
};

export default Tables;
