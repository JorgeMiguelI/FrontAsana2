import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {render} from 'react-dom';
import Login from './login';
import Principal from './principal';
import Registro from './Registro';
import ReactDOM from 'react-dom';
import MisTareas from './MisTareas';
import NuevoProyecto from './NuevoProyecto';
import NuevoEquipo from './NuevoEquipo';
import RegistroU from './RegistroU';
import NuevaTarea from './NuevaTarea';



class App extends Component{
    render(){
        return(
            <Router>
                <Route exact path="/" component={Login}/>
                
                <Route path="/principal" component={Principal}/>
                <Route path="/registro" component={RegistroU}/>
                <Route path="/MisTareas" component={MisTareas}/>
                <Route path="/NuevoProyecto" component={NuevoProyecto}/>
                <Route path="/NuevoEquipo" component={NuevoEquipo}/>
                <Route path="/NuevaTarea" component={NuevaTarea}/>
            </Router>
            
        
        )
    }
}
//alert("Hola");
//document.getElementById('layoutSidenav_content').setAttribute("value","Hola");
//render(<React.StrictMode><App/></React.StrictMode>,document.getElementById('root')); 

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );