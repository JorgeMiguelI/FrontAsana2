import axios from 'axios';
import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import ReactDOM from 'react-dom';

import Barra from './bar';
import NuevaSubTarea from './NuevaSubTarea';
import Topbar from './topbar';



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


    const Editar = () => {
        props.history.push("/EditarTarea/"+props.info);
    }



    useEffect(() => {
        if (props.info != "") {
            let info = JSON.parse(props.info);
            if (document.getElementById("inputNombre") != null) {
                document.getElementById("inputNombre").setAttribute("value", info.InfoTarea.nombre);
                document.getElementById("inputResponsable").setAttribute("value","Uno Nombre");
                document.getElementById("inputProyecto").setAttribute("value",info.InfoProyecto.nombre);
                document.getElementById("selectPr").setAttribute("value", info.InfoTarea.prioridad);
                document.getElementById("inputDate").setAttribute("value", info.InfoTarea.fecha_entrega);


                if(document.getElementById("inputDescripcion").hasChildNodes()){
                    document.getElementById("inputDescripcion").childNodes[0].remove();
                }
                if( document.getElementById("inputComentarios").hasChildNodes()){
                    document.getElementById("inputComentarios").childNodes[0].remove();
                }
                document.getElementById("inputDescripcion").appendChild(document.createTextNode(info.InfoTarea.descripcion));
                document.getElementById("inputComentarios").appendChild(document.createTextNode(info.InfoTarea.observaciones));
            }

        }
    });

    return (

        <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Detalles</h3><button className="btn btn-ligth" onClick={Cerrar}>Cerrar</button></div>
            <div className="card-body">
                <form id="Principal">

                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputNombre">Nombre</label>
                                <input className="form-control py-4" id="inputNombre" type="text" placeholder="" name="nombreT"  />
                                

                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="selectP">Proyecto</label>
                                <input className="form-control py-4" id="inputProyecto" type="text" placeholder="Nombre del equipo" name="nombreT"  />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="selectM">Responsable: </label>
                                <input className="form-control py-4" id="inputResponsable" type="text" placeholder="" name="nombreT"  />
                            </div>
                        </div>



                    </div>


                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputDate">Fecha de Entrega</label>
                                <input className="form-control py-4" id="inputDate" type="date" name="fecha" ref={register({
                                    required: true,


                                })} />
                                {errors.fecha?.type === "required" && (<small className="form-text text-muted alert-danger ">Campo requerido</small>)}
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="selectP">Prioridad: </label>
                                <input className="form-control py-4" id="selectPr" type="text" placeholder="" name="nombreT"  />
                            </div>
                        </div>


                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputDescripcion">Descripción</label>
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










                <div className="form-group mt-4 mb-0"><button className="btn btn-primary btn-block" onClick={() => { /*guardar()*/ }}>Editar</button></div>
            </div>
        </div>

    )
}

