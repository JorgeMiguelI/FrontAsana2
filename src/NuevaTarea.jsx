import axios from 'axios';
import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useForm } from "react-hook-form";

import Barra from './bar';
import NuevaSubTarea from './NuevaSubTarea';
import Topbar from './topbar';
import ReactDOM from 'react-dom';




export default function NuevaTarea(props) {

    const { register, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
    })

    var miembros;
    let opcionSelected;
    let subtareas;
    useEffect(() => {
        llenarForm();
    })

    const guardar = async () => {
        subtareas = new Array();
        let idTarea;
        if (document.getElementById("Tareas").hasChildNodes()) {
            let Tareas = document.getElementById("Tareas").childElementCount;
            //console.log(document.getElementById("Tareas").childElementCount);
            for (let i = 1; i <= Tareas; i++) {
                idTarea = document.getElementsByClassName(i)[0].value;
                subtareas.push(idTarea);
            }


          //  console.log(subtareas);
        }


        let info = {
            nombre: document.getElementById("inputNombre").value,
            proyecto: document.getElementById("selectP").value,
            encargado: document.getElementById("selectM").value,
            fecha_entrega: document.getElementById("inputDate").value,
            prioridad: document.getElementById("selectPr").value,
            estado: "A",
            descripcion: document.getElementById("inputDescripcion").value,
            observaciones: [document.getElementById("inputComentarios").value],
            subtareas: subtareas,
            fecha_publicacion:new Date(),
            EsTarea:true
        }
        const res = await axios.post("http://localhost:4000/addTarea", {
            data: info
        })
        if (res.data.msg == "error") {

            swal({
                title: "Error",
                icon: "warning",
                text: "No se pudo Registrar la Tarea",
                button: "Cerrar"
            });


        } else {
            //Notificar registro exitoso
            props.history.push("/principal");
        }
    }









    const CrearNuevaSubTarea = () => {
        console.clear();
       // console.log("NuevaSubTarea");

        let divTareas = document.getElementById("Tareas");
        let id = 0;
        if (divTareas.hasChildNodes()) {
            id = parseInt(divTareas.lastChild.id);
          //  console.log(id);
        } else {

        }







        let nuevaSubTarea = document.createElement("div");
        nuevaSubTarea.className = "card-body";
        nuevaSubTarea.setAttribute("id", id + 1);
        let proyecto=document.getElementById("selectP").value;
        divTareas.appendChild(nuevaSubTarea);
        let subtarea = <NuevaSubTarea idST={id + 1} miembros={miembros} proyecto={proyecto} />

        ReactDOM.render(subtarea, nuevaSubTarea);


    }



    const limpiarSelect = () => {
        let select = document.getElementById("selectM");
        //borramos sus hijos para poder rellenar
        if (select.hasChildNodes()) {
            let i;
            for (i = 0; i < select.childElementCount; i++) {

                select.removeChild(select.childNodes[i]);
            }

        }

    }

    const llenaSelect2 = async () => {


        if (document.getElementById("Tareas").hasChildNodes()) {
            swal({
                title: "Error",
                text: "No se puede cambiar mientras tenga subtareas",
                icon: "warning",
                button: "Cerrar",
            });
            document.getElementById("selectP").setAttribute("value", opcionSelected);
            document.getElementById("selectP").value = opcionSelected;
        } else {
            document.getElementById("BtnNST").classList.remove("d-none");

            let idProyecto = document.getElementById("selectP").value;
            opcionSelected = idProyecto;
            const res = await axios.get("http://localhost:4000/GetMiembros/" + idProyecto)
            const data = res.data;
            if (data.msg == "error") {
                console.log("Hay un error");
            } else {
              //  console.log(data);

                let select = document.getElementById("selectM");
                //borramos sus hijos para poder rellenar
                if (select.hasChildNodes()) {
                    let i;
                    for (i = 0; i < select.childElementCount; i++) {

                        select.removeChild(select.childNodes[i]);
                    }

                }
                console.log(select);

                let option;
                console.clear();
               // console.log("---------- miembros-----");
                limpiarSelect();
               // console.log(data);
                miembros = JSON.stringify(data);
                data.map((item) => {
                    option = document.createElement("option");
                    option.appendChild(document.createTextNode(item.nombre));
                    option.setAttribute("value", item._id);
                    select.appendChild(option);
                });



            }

        }
        //console.log(document.getElementById("selectM").value);




    }


    const llenarForm = async () => {
        let idEmpresa = localStorage.getItem("IdEmpresa");
       // console.log(idEmpresa);
        const res = await axios.get("http://localhost:4000/GetProyectos/" + idEmpresa)
        const data = res.data;
        if (data.msg === "Error") {
            console.log("Erro trallendo proyectos");
        } else {
            let SelectP = document.getElementById("selectP");

            let option;
           // console.log(data);


            if (SelectP.hasChildNodes()) {
                let i;
                for (i = 0; i < SelectP.childElementCount; i++) {

                    SelectP.removeChild(SelectP.childNodes[i]);
                }

            }

            if (SelectP.hasChildNodes()) {
                let i;
                for (i = 0; i < SelectP.childElementCount; i++) {

                    SelectP.removeChild(SelectP.childNodes[i]);
                }

            }





            data.map((item) => {
                option = document.createElement("option");
                option.appendChild(document.createTextNode(item.nombre));
                option.setAttribute("value", item._id);
                SelectP.appendChild(option);
            });
            option = document.createElement("option");
            option.appendChild(document.createTextNode("Seleccione..."));
            option.setAttribute("value", 0);
            SelectP.appendChild(option);

            SelectP.value=0;


        }
    }






    return (
        <div className="sb-nav-fixed">

            <Topbar history={this.props.history} />

            <div id="layoutSidenav">


                <Barra history={props.history} />



                <div id="layoutSidenav_content">
                    <div id="cards" className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Nueva Tarea</h3></div>
                        <div className="card-body">
                            <form id="Principal">

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputNombre">Nombre<font color="red">*</font></label>
                                            <input className="form-control py-4" id="inputNombre" type="text" placeholder="Nombre de la tarea" name="nombreT" ref={register({
                                                required: true,
                                                minLength: 1,

                                            })} />
                                            {errors.nombreT?.type === "required" && (<small className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                            {errors.nombreT?.type === "minLength" && (<small className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputDate">Fecha de Entrega<font color="red">*</font></label>
                                            <input className="form-control py-4" id="inputDate" type="date" name="fecha" />
                                            
                                        </div>

                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="selectP">Proyecto<font color="red">*</font></label>
                                            <select name="proyecto" id="selectP" className="form-control" onChange={() => {
                                                llenaSelect2()
                                            }}>
                                                <option value="null">Seleccione...</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="selectM">Para:<font color="red">*</font> </label>
                                            <select name="responsable" id="selectM" className="form-control">
                                                <option value="null">Seleccione...</option>
                                            </select>
                                        </div>
                                    </div>



                                </div>


                                <div className="form-row">
                                    


                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputDescripcion">Descripción<font color="red">*</font></label>
                                            <textarea className="form-control py-3" id="inputDescripcion" placeholder="Descripción..." name="descripcion"ref={register({
                                                required: true,
                                                minLength: 1,

                                            })} ></textarea>
                                            {errors.descripcion?.type === "required" && (<small className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                            {errors.descripcion?.type === "minLength" && (<small className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="selectP">Prioridad: <font color="red">*</font></label>
                                            <select name="prioridad" id="selectPr" className="form-control">
                                                <option value="null">Seleccione</option>
                                                <option value="Alta">Alta</option>
                                                <option value="Media">Media</option>
                                                <option value="Baja">Baja</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>






                                <input type="hidden" name="creador" />
                                <input type="hidden" name="estado" value="A" />
                            </form>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <h6>Sub Tareas</h6>
                                </div>
                            </div>
                            <div id="Tareas" className="card" style={{ marginBottom: "1em" }}>


                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <button id="BtnNST" type="button" className="btn btn-secondary d-none" onClick={CrearNuevaSubTarea}><i className="fas fa-plus"></i>Agregar Sub Tarea</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="small mb-1" htmlFor="inputComentarios">Observaciones</label>
                                        <textarea className="form-control py-3" id="inputComentarios" placeholder="Observaciones..." name="comentarios" form="Principal"></textarea>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group mt-4 mb-0"><button id="crearP" className="btn btn-block" onClick={() => { guardar() }}>Crear Tarea</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )









}
