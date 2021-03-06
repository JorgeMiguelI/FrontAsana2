import axios from 'axios';
import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import SubTarea from './SubTarea';




export default function DetallesTarea(props) {

    const Cerrar = () => {
      
        
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
        console.clear();
        //console.log(props);
        localStorage.setItem("Info",props.info);
        Cerrar();
        props.history.push("/EditarTarea");
        
    }

    const Eliminar=async()=>{
        let info = JSON.parse(props.info);
        let idTarea= info.InfoTarea._id;
        const res= await axios.delete("http://localhost:4000/deleteTarea/"+idTarea)
        const data= await res.data;
        if(data.msg=="Error"){
            alert("No se pudo eliminar la Tarea");
        }else{
            if(data.deletedCount==0){
                swal({
                    title:"Error",
                    text:"La tarea que se quiere eliminar no se encuentra registrada",
                    icon:"warning",
                    button:"Cerrar"}
                    );
            }else if(data.deletedCount>0){
               Cerrar();
            }
        }
    }

    useEffect(() => {
        if (props.info != "") {
            let info = JSON.parse(props.info);
            //console.log(info);
            if (document.getElementById("inputNombre") != null) {
                document.getElementById("inputNombre").setAttribute("value", info.InfoTarea.nombre);
                document.getElementById("inputResponsable").setAttribute("value",info.InfoEncargado.nombre);
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
                let detallesSubT=document.getElementById("TareasD");
                if(detallesSubT.hasChildNodes()){
                    for(let hijo of detallesSubT.childNodes){
                        ReactDOM.unmountComponentAtNode(hijo);
                        hijo.remove();
                    }
                }

                if(!info.EsTarea){
                    if(document.getElementById("TareaPadre").classList.contains("d-none")){
                        document.getElementById("TareaPadre").classList.remove("d-none");
                        
                    }
                    document.getElementById("inputTareaPadre").setAttribute("value",info.InfoTareaPadre.nombre);
                }else{
                    document.getElementById("TareaPadre").classList.add("d-none");
                }





                if(info.SubTareas.length==0){
                    document.getElementById("SubTareaTitle").classList.add("d-none");
                    
                }else{
                    
                    if(document.getElementById("SubTareaTitle").classList.contains("d-none")){
                        document.getElementById("SubTareaTitle").classList.remove("d-none");
                        
                    }
                   
                    



                    for(let SubTarea1 of info.SubTareas){
                        let divT=document.createElement("div");
                        divT.setAttribute("id","Div"+SubTarea1.subtarea._id);
                        detallesSubT.appendChild(divT);
                        let subTareaInf=<SubTarea idST={SubTarea1.subtarea._id} info={JSON.stringify(SubTarea1)} key={SubTarea1.subtarea._id} bntEliminar=""/>
                        ReactDOM.render(subTareaInf, divT);
                    }




                    
                }
                
            }

        }
    });

    return (

        <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Detalles</h3><button className="btn btn-ligth" onClick={Cerrar}>Cerrar</button><button className="btn btn-danger" id="BtnEliminarTarea" onClick={Eliminar}>Eliminar</button></div>
            <div className="card-body">
                <form id="Principal">

                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputNombre">Nombre</label>
                                <input className="form-control py-4" id="inputNombre" type="text" placeholder="" name="nombreT"  />
                                

                            </div>
                        </div>
                        <div className="col-md-6" id="TareaPadre">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputNombre">SubTarea de:    </label>
                                <input className="form-control py-4" id="inputTareaPadre" type="text" placeholder="" name="nombreT"  />
                                

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
                    <div className="col-md-6" id="SubTareaTitle">
                        <h6>Sub Tareas</h6>
                    </div>
                </div>
                <div id="TareasD" className="card" style={{ marginBottom: "1em" }}>


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










                <div className="form-group mt-4 mb-0">
                  {localStorage.getItem("Rol")!="C"?<button className="btn btn-primary btn-block" onClick={() => { Editar() }}>Editar</button>:<div></div>}
                </div>
            </div>
        </div>

    )
}

