import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Barra from './bar';
import Topbar from './topbar';
import TareasHoy from './TareasHoy';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';








export default class Principal extends Component {



    constructor(props) {
        super(props);

    }

    state = {
        show: true,
        component: 1
    }

    componentDidMount() {
        this.TraerMisTareas();
       // this.getProyectos();
    }

    TraerMisTareas = async () => {
        let idColaborador = localStorage.getItem("ID");
        const res = await axios.get("http://localhost:4000/GetMisTareas/" + idColaborador);
        const data = await res.data;
        if (data.msg == "Error") {
            console.log("Error al querer traer las tareas");
        } else {
            if (data.length == 0) {
                console.log("No hay tareas");
            } else {

                //console.log(data);


                let Hoy = new Array()
                let fecha_actual = new Date();
                let contador=0;
                let llenado = new Promise((resolve, rejecte) => {
                    data.map(async (item) => {
                        let fechaTarea = new Date(item.fecha_entrega);
                        let tiempo = fechaTarea.getDate() - fecha_actual.getDate();

                        let ListaTemp = new Array();
                        let ListaSubtareas = new Array();


                        //Buscamos el proyecto al cual se asigno cada una de las tareas
                        let resp = await axios.get("http://localhost:4000/GetProyectoById/" + item.proyecto);
                        let proyecto = await resp.data;

                        //Buscamos el encargado de la tarea
                        const resp2 = await axios.get("http://localhost:4000/GetColaborador/" + item.encargado);
                        let encargado = await resp2.data;


                        //Buscar subtareas que tiene las tareas
                        for (let idSubtarea of item.subtareas) {
                            const resp3 = await axios.get("http://localhost:4000/GetTarea/" + idSubtarea);
                            let subtarea = await resp3.data;
                            ListaTemp.push(subtarea)
                        }
                        //Buscamos al encargado para cada una de las subtareas
                        for (let subtarea of ListaTemp) {
                            const resp4 = await axios.get("http://localhost:4000/GetColaborador/" + subtarea.encargado)
                            let encargadoSub = await resp4.data;
                            ListaSubtareas.push({ subtarea: subtarea, encargado: encargadoSub, tareaPadre: item });
                        }
                        let estarea;
                        let TareaPadre;
                       // console.log(item);
                        if (!item.EsTarea) {
                            estarea = false;
                            let resp1 = await axios.get("http://localhost:4000/GetTareaPadre/" + item._id);
                            TareaPadre = await resp1.data;




                        } else {
                            estarea = true;
                            TareaPadre = "";
                        }







                        let InfoTarea = {
                            EsTarea: estarea,
                            InfoTarea: item,
                            InfoProyecto: proyecto,
                            InfoEncargado: encargado,
                            SubTareas: ListaSubtareas,
                            InfoTareaPadre: TareaPadre
                        }
                        //  console.log(InfoTarea);
                        let bandera=fechaTarea.getFullYear()>fecha_actual.getFullYear()?true:false;

                        if (tiempo <= 0 && !bandera) {
                            if(item.estado=="A"){
                                Hoy.push(InfoTarea);
                            }    
                            


                            
                        }

                       
                        contador++;
                        // console.log(contador);
                        if (contador == data.length) {
                            resolve();
                        }


                    });

                });

                /*console.log(Hoy);
               console.log(MasTarde);
               //console.log(data);
*/


                let divTareas = document.getElementById("accordionExample");
                llenado.then(() => {

                    //Tareas hoy
                    let HoyDiv = document.createElement("div");
                    HoyDiv.setAttribute("id", "hoy")
                    divTareas.appendChild(HoyDiv);

                    let TareasHoy1 = <TareasHoy tareas={JSON.stringify(Hoy)} history={this.props.history} />
                    ReactDOM.render(TareasHoy1, HoyDiv);






                });




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

    getProyectos = async () => {

        let proyectosDiv = document.getElementById("ProyectosDiv");
        let divP;
        let linkP;
        let myId = localStorage.getItem("ID");
        let proyectos = [];

        const resp = await axios.get("http://localhost:4000/GetEquipoColaborador/" + myId);
        let data = resp.data;
        //console.log(data);
        if (data.msg == "error") {
            //no se pudo traer tus proyectos
        } else {
            proyectos = data;
            if (proyectos.length != 0) {
                // console.log(proyectos);

                proyectos.map((item) => {
                    if (item != null) {
                        divP = document.createElement("div");
                        divP.setAttribute("id", item._id);


                        let nombre =  item.nombre;
                        let ruta = "/Detallesproyecto/" + item._id;
                        linkP = <a className="nav-link" onClick={() => { this.Detallesproyecto(ruta) }}><div className="sb-nav-link-icon"><font color={item.color}><i className="fas fa-archive"></i></font></div>
                            {nombre}</a>
                        // console.log(linkP);
                        // divP.appendChild(linkP);

                        proyectosDiv.appendChild(divP);
                        ReactDOM.render(linkP, divP);
                    }

                });



            }
            //console.log(proyectos)
        }







    }













    
    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar history={this.props.history}/>

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div className="containerT" >
                            <div className="row" style={{ "padding": "1rem" }}>

                                <div className="col-sm-6"><Link to="/MisTareas"><button type="button" className="btn btn-primary"><i className="far fa-check-circle"></i>Mis Tareas</button></Link> </div>

                            </div>
                            <div className="row" style={{ "padding": "1rem" }}>
                                <div className="col-md-7">
                                    <div className="accordion" id="accordionExample" style={{ width: "80%" }}>



                                    </div>
                                </div>
                                <div className="col-md-5" id="DetallesTarea">

                                </div>
                            </div>
                            <div className="row" style={{ "padding": "1rem" }}>
                                <div className="col-md 3">
                                <h6> <font color="red"><i className="fas fa-archive"></i></font><br/>proyecto</h6>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


