import axios from 'axios';
import React, { Component, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Barra from './bar';
import Topbar from './topbar';







export default class NuevaSubTarea extends Component {



    componentDidMount(){
        this.llenaSelect2();
    }


    llenaSelect2=async()=>{
      

            var select=document.getElementById("selectM1"+this.props.idST);
            var option;

            //borramos sus hijos para poder rellenar
            if(select.hasChildNodes()){
                var i;
                for(i=0;i<select.childElementCount;i++){
                    
                    select.removeChild(select.childNodes[i]);
                }
    
            }

            console.log("---------- subtarea-----");
            var miembros=JSON.parse(this.props.miembros)
            console.log(miembros);
            
            miembros.map((item)=>{
                option=document.createElement("option");
                option.appendChild(document.createTextNode(item.nombre));
                option.setAttribute("value",item._id);
                select.appendChild(option);
            });



        


    }

    EliminarC=(event)=>{
        var padre=event.target.parentElement;
        var padre1=padre.parentElement;
        padre1.remove();
    }

    guardar=async()=>{
        document.getElementById("BtnG"+this.props.idST).classList.add("d-none");
        let nombre=document.getElementById("nombre").value;
        let fecha=document.getElementById("fecha").value;
        let responsable=document.getElementById("selectM1"+this.props.idST).value;
        let creador=localStorage.getItem("ID");

        let info= {nombre: nombre, estado: "A", fecha_entrega:fecha, encargado: responsable, creador: creador};
        
        const res=await axios.post("http://localhost:4000/addSubtarea", {
            data: info
        })
        if(res.data.msg=="error"){
            //Mensaje de error
        }else{
            //Notificar registro exitoso
            const IdSubtareaRegistrada= res.data.idSubtarea; //Id de la subtarea registrada
            console.log("Id SubTarea  "+ IdSubtareaRegistrada );
            
            document.getElementsByClassName(this.props.idST)[0].setAttribute("value",IdSubtareaRegistrada);
        }
    }


    render() {
        return(
        
            <div className="form-row">

                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><button className="btn  btn-ligh"><i className="fas fa-ellipsis-v"></i></button>                  <button className="btn  btn-ligh"><i className="far fa-check-circle"></i></button></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Tarea" aria-label="Username" aria-describedby="basic-addon1" id="nombre"/>

                    </div>

                </div>
                <div className="col-md-2" >

                    <input type="date" name="fecha" className="form-control" id="fecha"/>



                </div>
                <div className="col-md-4">
                    <div className="form-group">

                        <select name="responsable" id={"selectM1"+this.props.idST} className="form-control">
                            <option value="null">Seleccione responsable...</option>
                        </select>
                    </div>
                </div>
                <input type="hidden" name="IDSubTarea" className={this.props.idST}/>
                <button className="btn btn-primary" id={"BtnG"+this.props.idST} onClick={this.guardar}>Guardar</button> <button className="btn btn-danger" onClick={this.EliminarC}>Eliminar</button>
            </div>
            
        
    )}
}