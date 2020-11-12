import React, { Component } from 'react'
import {Link} from "react-router-dom";
import DetallesTarea from './DetallesTarea';
import ReactDOM from 'react-dom';

export default class SubTarea extends Component {
    idBtnA="SubTBtn"+this.props.idST;
    idDate="SubTDate"+this.props.idST;
    idName="SubTName"+this.props.idST;
    idRespo="SubTResp"+this.props.idST;
    info;
    bandera=0;

    componentDidMount(){
        console.log(this.props.info);
        
        if(this.props.info!=""){
            this.info=JSON.parse(this.props.info);
            document.getElementById(this.idName).setAttribute("value",this.info.subtarea.nombre);
            document.getElementById(this.idDate).setAttribute("value",this.info.subtarea.fecha_entrega);
            document.getElementById(this.idRespo).setAttribute("value",this.info.encargado.nombre);
        }
        
    }


     DetallesTareaShow=()=>{

        let divDetallesTareas=document.getElementById("DetallesTarea");
       

        console.log(JSON.parse(this.props.info));
        let Detalles = <DetallesTarea info={this.props.info} />

       
        
        ReactDOM.render(Detalles,divDetallesTareas);







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
                           

                            
                        </div>
                   
        )
    }
}
