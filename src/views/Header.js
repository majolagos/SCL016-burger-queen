
//  <header classNam=pp-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

const mascota = {
    nombre: 'Tom',
    edad: 10,
    vivo: true,
    objeto: {
        saludo: 'hola',
        despedida: 'chao'
    }
}

mascota.razas = ['gato negro', 'gato amarillo'];

const {nombre, edad, vivo, objeto} = mascota;

console.log(nombre, edad, vivo, objeto.saludo, objeto.despedida);