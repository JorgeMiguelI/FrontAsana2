import React, { Component } from 'react'
import TareasProximas from './TareasProximas'
import TareasRecientes from './TareasRecientes'
import Barra from './bar'
import Topbar from './topbar'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class MisTareas extends Component {

    componentDidMount(){
        this.TraerMisTareas();
    }

    TraerMisTareas=async()=>{
        let idColaborador=localStorage.getItem("ID");
        const res= await axios.get("http://localhost:4000/GetMisTareas/"+idColaborador);
        const data= await res.data;
        if(data.msg=="Error"){
            alert("Error al querer traer las tareas");
        }else{
            if(data.length==0){
                swal({
                    title: "No hay tareas",
                    text: "Actualmente no tiene tareas asignadas",
                    icon: "info",
                    button: "Cerrar",
                });
            }else{
                
                console.log(data);

                let Recientes=new Array();

                let fecha_actual=new Date().getDate();
                
                data.map((item)=>{
                    let fechaTarea=new Date(item.fecha_entrega);
                    let tiempo=fecha_actual-fechaTarea.getDate();
                    let documento;
                    if(tiempo<=6){
                        Recientes.push(item);
                        documento=data.indexOf(item);
                        data.splice(documento,1);
                    }


                });
                console.log(Recientes);
                console.log(data);



                let divTareas=document.getElementById("accordionExample");
                let RecientesDiv=document.createElement("div");
                RecientesDiv.setAttribute("id","recientes")

                divTareas.appendChild(RecientesDiv);
                let TareasR = <TareasProximas tareas={JSON.stringify(Recientes)}/>
                
                ReactDOM.render(TareasR,RecientesDiv);



            }
            



        }


/*
        let divTareas=document.getElementById("accordionExample");
        let nuevaSubTarea=document.createElement("div");

        divTareas.appendChild(nuevaSubTarea);
        let subtarea = <NuevaSubTarea idST={id + 1} miembros={miembros} />

        ReactDOM.render(subtarea, nuevaSubTarea);
    */

    }







    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar />

                <div id="layoutSidenav">


                    <Barra />



                    <div id="layoutSidenav_content">
                        <div className="container" >
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-8"><Link to="/NuevaTarea"><button type="button" className="btn btn-primary"><i className="fas fa-plus"></i>Agregar Tarea</button></Link> </div>

                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="accordion" id="accordionExample" style={{ width: "80%" }}>
                                        
                                       

                                    </div>
                                </div>
                                <div className="col-md-4" id="DetallesTarea">

                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
