import axios from 'axios';
import React, {  useEffect  } from 'react'

import Barra from './bar';
import NuevaSubTarea from './NuevaSubTarea';
import Topbar from './topbar';
import ReactDOM from 'react-dom';




export default function NuevaTarea(props) {

    var miembros;

    useEffect(() => {
       llenarForm();
    })

    const guardar=async()=>{
        if(document.getElementById("Tareas").hasChildNodes()){
            console.log(document.getElementById("Tareas").childElementCount());
        }



    }

    const CrearNuevaSubTarea=()=>{
        console.clear();
        console.log("NuevaSubTarea");

        var divTareas=document.getElementById("Tareas");
        var id=0;
        if(divTareas.hasChildNodes()){
            id=parseInt(divTareas.lastChild.id);
            console.log(id);
        }else{
            
        }



        


        
        var nuevaSubTarea=document.createElement("div");
        nuevaSubTarea.className="card-body";
        nuevaSubTarea.setAttribute("id",id+1);

        divTareas.appendChild(nuevaSubTarea);
        var subtarea=<NuevaSubTarea idST={id+1} miembros={miembros}/>
        
        ReactDOM.render(subtarea,nuevaSubTarea);
    

    }

    const guardarSubTarea=async()=>{
        
        let info= {nombre: "Crear APis", estado: "P", fecha_entrega:"04-09-1997", encargado: "5f9771fdec010356783eaa38", creador: "5f9b1c27ad4ba3290ccb9dba"};
        const res=await axios.post("http://localhost:4000/addSubtarea", {
            data: info
        })
        if(res.data.msg=="error"){
            //Mensaje de error
        }else{
            //Notificar registro exitoso
            const IdSubtareaRegistrada= res.data.idSubtarea; //Id de la subtarea registrada
            console.log(IdSubtareaRegistrada);
        }
    }

    const llenaSelect2=async()=>{

        document.getElementById("BtnNST").classList.remove("d-none");

        var idProyecto =document.getElementById("selectP").value;
        const res=await axios.get("http://localhost:4000/GetMiembros/"+idProyecto)
        const data= res.data;
        if(data.msg=="error"){
            console.log("Hay un error");
        }else{
            console.log(data);

            var select=document.getElementById("selectM");
            //borramos sus hijos para poder rellenar
            if(select.hasChildNodes()){
                var i;
                for(i=0;i<select.childElementCount;i++){
                    
                    select.removeChild(select.childNodes[i]);
                }
    
            }

            var option;
            console.clear();
            console.log("---------- miembros-----");
            console.log(data);
            miembros=JSON.stringify(data);
            data.map((item)=>{
                option=document.createElement("option");
                option.appendChild(document.createTextNode(item.nombre));
                option.setAttribute("value",item._id);
                select.appendChild(option);
            });



        }


    }


    const llenarForm=async()=>{
        let idEmpresa=localStorage.getItem("IdEmpresa");
        console.log(idEmpresa);
        const res= await axios.get("http://localhost:4000/GetProyectos/"+idEmpresa) 
        const data=res.data;
        if(data.msg==="Error"){
            console.log("Erro trallendo proyectos");
        }else{
            var SelectP=document.getElementById("selectP");

            var option;
            console.log(data);
            data.map((item)=>{
                option=document.createElement("option");
                option.appendChild(document.createTextNode(item.nombre));
                option.setAttribute("value",item._id);
                SelectP.appendChild(option);
            });
            


        }
    }






    return (
        <div className="sb-nav-fixed">

            <Topbar />

            <div id="layoutSidenav">


                <Barra estado={Topbar} />



                <div id="layoutSidenav_content">
                    <div className="card shadow-lg border-0 rounded-lg mt-5" style={{ margin: "1em" }}>
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Nueva Tarea</h3></div>
                        <div className="card-body">
                            <form id="Principal">

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputNombre">Nombre</label>
                                            <input className="form-control py-4" id="inputNombre" type="text" placeholder="Nombre del equipo" name="nombre" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="selectP">Proyecto</label>
                                            <select name="proyecto" id="selectP" className="form-control" onChange={() => {
                                                 llenaSelect2()
                                            }}>
                                                <option value="null">Seleccione...</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="selectM">Para: </label>
                                            <select name="responsable" id="selectM" className="form-control">
                                                <option value="null">Seleccione...</option>
                                            </select>
                                        </div>
                                    </div>



                                </div>


                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputDate">Fecha de Entrega</label>
                                            <input className="form-control py-4" id="inputDate" type="date" name="fecha" />
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="selectP">Prioridad: </label>
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
                                            <label className="small mb-1" htmlFor="inputDescripcion">Descripción</label>
                                            <textarea className="form-control py-4" id="inputDescripcion" placeholder="Descripción..." name="descripcion"></textarea>
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
                            <div id="Tareas" className="card" style={{marginBottom:"1em"}}>
                                

                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <button  id="BtnNST" type="button" className="btn btn-secondary d-none" onClick={CrearNuevaSubTarea}><i className="fas fa-plus"></i>Agregar Sub Tarea</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputComentarios">Comentarios</label>
                                            <textarea className="form-control py-4" id="inputComentarios" placeholder="Comentarios..." name="comentarios" form="Principal"></textarea>
                                        </div>
                                </div>
                            </div>










                            <div className="form-group mt-4 mb-0"><button className="btn btn-primary btn-block" onClick={() => { guardar() }}>Crear Tarea</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )









}
