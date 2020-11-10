import axios from 'axios';
import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useForm } from "react-hook-form";

import Barra from './bar';
import NuevaSubTarea from './NuevaSubTarea';
import Topbar from './topbar';
import ReactDOM from 'react-dom';


export default function DetallesTarea(props) {

    const Cerrar = (ev) => {
        let padre = ev.target.parentElement;
        let padre1 = padre.parentElement;
        //padre1.remove();
        
        let correcto=ReactDOM.unmountComponentAtNode(document.getElementById("DetallesTarea"));
    }
    const { register, errors } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
    })


    const getProyecto = () => {

    }



    useEffect(() => {
        if (props.info != "") {
            let info = JSON.parse(props.info);
            if (document.getElementById("inputNombre") != null) {
                document.getElementById("inputNombre").setAttribute("value", info.nombre);
                /*let option=document.createElement("option");
                option.setAttribute("value",info.proyecto)
                document.getElementById("selectP").appendChild()*/
                document.getElementById("selectPr").setAttribute("value", info.prioridad);
                document.getElementById("inputDate").setAttribute("value", info.fecha_entrega);


                if(document.getElementById("inputDescripcion").hasChildNodes()){
                    document.getElementById("inputDescripcion").childNodes[0].remove();
                }
                if( document.getElementById("inputComentarios").hasChildNodes()){
                    document.getElementById("inputComentarios").childNodes[0].remove();
                }
                document.getElementById("inputDescripcion").appendChild(document.createTextNode(info.descripcion));
                document.getElementById("inputComentarios").appendChild(document.createTextNode(info.observaciones));
            }

        }
    });

    return (

        <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Nueva Tarea</h3><button className="btn btn-ligth" onClick={Cerrar}>Cerrar</button></div>
            <div className="card-body">
                <form id="Principal">

                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputNombre">Nombre<font color="red">*</font></label>
                                <input className="form-control py-4" id="inputNombre" type="text" placeholder="Nombre del equipo" name="nombreT" ref={register({
                                    required: true,
                                    minLength: 1,

                                })} />
                                {errors.nombreT?.type === "required" && (<small className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                {errors.nombreT?.type === "minLength" && (<small className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}

                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="selectP">Proyecto<font color="red">*</font></label>
                                <select name="proyecto" id="selectP" className="form-control" onChange={() => {
                                    //llenaSelect2()
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
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputDate">Fecha de Entrega<font color="red">*</font></label>
                                <input className="form-control py-4" id="inputDate" type="date" name="fecha" ref={register({
                                    required: true,


                                })} />
                                {errors.fecha?.type === "required" && (<small className="form-text text-muted alert-danger ">Campo requerido</small>)}
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
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputDescripcion">Descripción<font color="red">*</font></label>
                                <textarea className="form-control py-4" id="inputDescripcion" placeholder="Descripción..." name="descripcion" ref={register({
                                    required: true,
                                    minLength: 1,

                                })} ></textarea>
                                {errors.descripcion?.type === "required" && (<small className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                {errors.descripcion?.type === "minLength" && (<small className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                            </div>
                        </div>
                    </div>






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
                        <button id="BtnNST" type="button" className="btn btn-secondary d-none" ><i className="fas fa-plus"></i>Agregar Sub Tarea</button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="small mb-1" htmlFor="inputComentarios">Observaciones</label>
                            <textarea className="form-control py-4" id="inputComentarios" placeholder="Observaciones..." name="comentarios" form="Principal"></textarea>
                        </div>
                    </div>
                </div>










                <div className="form-group mt-4 mb-0"><button className="btn btn-primary btn-block" onClick={() => { /*guardar()*/ }}>Crear Tarea</button></div>
            </div>
        </div>

    )
}

