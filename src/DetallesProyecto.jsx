import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';



import Barra from './bar';
import Topbar from './topbar';
import TareasProximas from './TareasProximas';
import TareasRecientes from './TareasRecientes';
import TareasHoy from './TareasHoy';



export default class DetallesProyecto extends Component {

    idProyecto;
    componentDidMount() {
        let undefined = void (0);
        console.log(this.props.match.params.id);
        if (this.props.match.params.id != undefined) {
            this.idProyecto = this.props.match.params.id;
            this.TraerMisTareas();
        }


    }

    componentDidUpdate(){

        let content=document.getElementById("accordionExample");
        for(let div of content.childNodes){
            ReactDOM.unmountComponentAtNode(div);
            div.remove();
        }



        let undefined = void (0);
        console.log(this.props.match.params.id);
        if (this.props.match.params.id != undefined) {
            this.idProyecto = this.props.match.params.id;
            this.TraerMisTareas();
        }
    }
    TraerMisTareas = async () => {

        let listaTareas = [];

        const resp = await axios.get("http://localhost:4000/GetTaskProject/" + this.idProyecto);
        const data = await resp.data;
        if (data.msg == "error") {
            //No se pudieron traer las tareas
        } else {

            if (data.length == 0) {
                swal({
                    title: "No hay tareas",
                    text: "Actualmente no tiene tareas asignadas",
                    icon: "info",
                    button: "Cerrar",
                });
            } else {

                listaTareas = data;
                console.log(listaTareas);

                //console.log(data);
                let PrioridadAlta = new Array();
                let PrioridadBaja = new Array();
                let PrioridadMedia = new Array();



                let Recientes = new Array();
                let Hoy = new Array()
                let fecha_actual = new Date().getDate();
                let MasTarde = new Array();
                let contador = 0;
                let llenado = new Promise((resolve, rejecte) => {
                    listaTareas.map(async (item) => {
                        let fechaTarea = new Date(item.fecha_entrega);
                        let tiempo = fechaTarea.getDate() - fecha_actual;

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
                        console.log(item);
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
                        if (tiempo <= 0) {
                            Hoy.push(InfoTarea);
                        }

                        if (tiempo <= 4 && tiempo > 0) {
                            Recientes.push(InfoTarea);


                        }

                        if (tiempo > 4) {
                            MasTarde.push(InfoTarea);
                        }


                        
                        if (item.prioridad == "Alta") {
                            PrioridadAlta.push(InfoTarea);
                        }
                        if (item.prioridad == "Media") {
                            PrioridadMedia.push(InfoTarea);

                        }
                        if (item.prioridad != "Alta" && item.prioridad != "Media" ) {
                            PrioridadBaja.push(InfoTarea);
                        }




                        contador++;
                        // console.log(contador);
                        if (contador == data.length) {
                            resolve();
                        }
                    });

                });


                let divTareas = document.getElementById("accordionExample");
                llenado.then(() => {

                    //Tareas hoy
                    let HoyDiv = document.createElement("div");
                    HoyDiv.setAttribute("id", "hoy")
                    divTareas.appendChild(HoyDiv);

                    let TareasHoy1 = <TareasHoy tareas={JSON.stringify(Hoy)} history={this.props.history} />
                    if(Hoy.length!=0){
                        ReactDOM.render(TareasHoy1, HoyDiv);
                    }

                    



                    //tareas recientes
                    let RecientesDiv = document.createElement("div");
                    RecientesDiv.setAttribute("id", "recientes")
                    divTareas.appendChild(RecientesDiv);

                    let TareasR = <TareasRecientes tareas={JSON.stringify(Recientes)} history={this.props.history} />
                    if(Recientes.length!=0){
                        ReactDOM.render(TareasR, RecientesDiv);
                    }
                    

                    //tareas para mas tarde
                    let MasTardeDiv = document.createElement("div");
                    MasTardeDiv.setAttribute("id", "MasTarde")
                    divTareas.appendChild(MasTardeDiv);

                    let TareasP = <TareasProximas tareas={JSON.stringify(MasTarde)} history={this.props.history} />
                    if(MasTarde.length!=0){
                        ReactDOM.render(TareasP, MasTardeDiv);
                    }
                    




                    console.clear();
                    console.log(PrioridadBaja);
                    console.log(PrioridadMedia);
                    console.log(PrioridadAlta);


                });




            }

        }





    }











    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar />

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div className="containerD" >
                            <div>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" >Lista</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Tablero</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="accordion lista-proyecto" id="accordionExample" >



                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <table className="table">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th colSpan="3" style={{ textAlign: "center" }}>Prioridad</th>
                                                </tr>
                                                <tr>

                                                    <th scope="col">Alta</th>
                                                    <th scope="col">Media</th>
                                                    <th scope="col">Baja</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>

                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>

                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>

                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>


                                    </div>
                                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
