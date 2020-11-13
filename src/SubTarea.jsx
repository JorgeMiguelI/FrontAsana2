import React, { Component } from 'react'
import {Link} from "react-router-dom";
import DetallesTarea from './DetallesTarea';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import axios from 'axios';

export default class SubTarea extends Component {
    idBtnA="SubTBtn"+this.props.idST;
    idDate="SubTDate"+this.props.idST;
    idName="SubTName"+this.props.idST;
    idRespo="SubTResp"+this.props.idST;
    idBtnE="BtnEliminar"+this.props.idST;
    info;
    bandera=0;

    componentDidMount(){
        console.clear();

        
        if(this.props.info!=""){
            this.info=JSON.parse(this.props.info);
            console.log(this.info);
            document.getElementById(this.idName).setAttribute("value",this.info.subtarea.nombre);
            document.getElementById(this.idDate).setAttribute("value",this.info.subtarea.fecha_entrega);
            document.getElementById(this.idRespo).setAttribute("value",this.info.encargado.nombre);
        }

        if(this.props.bntEliminar!=""){
            document.getElementById(this.idBtnE).classList.remove("d-none");
        }
        
    }


     


    Eliminar=async()=>{
         
        let idDiv="Div"+this.props.idST;
        
        ReactDOM.unmountComponentAtNode(document.getElementById(idDiv));
        document.getElementById(idDiv).remove();

        /*
        const res= await axios.delete("http://localhost:4000/deleteTarea/"+this.info.subtarea._id);
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
               // console.log(data);
                //alert("Se ha eliminado la tarea");
            }
        }*/
    }









    toogleC=()=>{
        if(this.bandera==0){
            document.getElementById(this.idBtnA).classList.toggle("fas");
            document.getElementById(this.idBtnA).classList.toggle("far");
            this.bandera++;
        }else{
            document.getElementById(this.idBtnA).classList.toggle("far");
            document.getElementById(this.idBtnA).classList.toggle("fas");
            this.bandera--;
        }
    }
        


    render() {
        return (
            
                        <div className="input-group ">
                           
                            <input type="text" className="form-control" placeholder="Tarea" aria-label="Tarea" aria-describedby="basic-addon1" id={this.idName}/>
                            <input type="date" className="form-control" id={this.idDate}/>
                            <input type="text" className="form-control" placeholder="Responzable" aria-label="Responzable" aria-describedby="basic-addon1" id={this.idRespo}/>
                            <button className="btn btn-danger d-none" id={this.idBtnE} onClick={this.Eliminar}>Eliminar</button>

                            
                        </div>
                   
        )
    }
}
