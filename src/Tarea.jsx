import React, { Component } from 'react'
import {Link} from "react-router-dom";
import DetallesTarea from './DetallesTarea';
import ReactDOM from 'react-dom';

export default class Tarea extends Component {
    idBtnA="BtnA"+this.props.idT;
    idDate="Date"+this.props.idT;
    idName="Name"+this.props.idT;
    info;
    bandera=0;

    componentDidMount(){
        if(this.props.info!=""){
            this.info=JSON.parse(this.props.info);
            document.getElementById(this.idName).setAttribute("value",this.info.InfoTarea.nombre);
            document.getElementById(this.idDate).setAttribute("value",this.info.InfoTarea.fecha_entrega);
        }
        
    }


     DetallesTareaShow=()=>{

        let divDetallesTareas=document.getElementById("DetallesTarea");
       

        console.log(JSON.parse(this.props.info));
        let Detalles = <DetallesTarea info={this.props.info}/>

       
        
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
            <div className="row tarea" >
                <div className="col">

                    <div className="card card-body">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{"height":"80%"}}><button className=" btn btn-ligh" onClick={this.toogleC}><i className="fas fa-check-circle" id={this.idBtnA}></i></button></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Tarea" aria-label="Tarea" aria-describedby="basic-addon1" id={this.idName}/>
                            <input type="date" className="form-control" id={this.idDate}/>
                            <button className=" btn btn-ligh" onClick={()=>{this.DetallesTareaShow()}}><i className="fas fa-info-circle"></i></button>

                            
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
