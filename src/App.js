import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }


  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambia
  //Para que no se ejecute continuamente, tenemos que pasarle como segundo parametro un arreglo vacio
  //El arreglo (de segundo parametro) es la dependencia, le asignamos algun state
  //La dependencia significa que cada vez que cambia ese state, se va a ejecutar el useEffect
  useEffect( () => {
    
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales] );


  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
    //Le doy una negacion porque con filter quiero que solo me devuelva los id que son diferentes al que yo ingrese (para asi eliminarlo)
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  } 

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';


  return (
    <Fragment>
     <h1>Administrador de pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario 
            crearCita = {crearCita}
          />
        </div>

        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
