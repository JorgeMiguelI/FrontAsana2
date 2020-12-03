import React, { Component } from 'react'
import {Link} from "react-router-dom";
import DetallesTarea from './DetallesTarea';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import axios from 'axios';

export default class Tarea extends Component {
    idBtnA="BtnA"+this.props.idT;
    idBtnA1="BtnA1"+this.props.idT;
    idDate="Date"+this.props.idT;
    idName="Name"+this.props.idT;
    info;
    bandera=false;

    componentDidMount(){
        
        
        
        if(this.props.info!=""){
            this.info=JSON.parse(this.props.info);
            //console.log(this.info);
            document.getElementById(this.idName).setAttribute("value",this.info.InfoTarea.nombre);
            document.getElementById(this.idDate).setAttribute("value",this.info.InfoTarea.fecha_entrega);
            
            if(this.info.InfoTarea.estado=="A"){
                if(document.getElementById(this.idBtnA).classList.contains("fas")){
                    document.getElementById(this.idBtnA).className="far fa-check-circle";
                    
                 

                }
                this.bandera=1;
                document.getElementById(this.idBtnA1).setAttribute("title","Activa");
               
            }else{
               // console.log(document.getElementById(this.idBtnA).classList);   
                if(!document.getElementById(this.idBtnA).classList.contains("far")){
                    document.getElementById(this.idBtnA).className="fas fa-check-circle";
                    
                    
                   
                }
                this.bandera=0;
                document.getElementById(this.idBtnA1).setAttribute("title","Inactiva");
            }

            //console.log(document.getElementById(this.idBtnA).classList);   
        }
        
    }


     DetallesTareaShow=()=>{

        let divDetallesTareas=document.getElementById("DetallesTarea");
       
        if(divDetallesTareas!=null){
           // console.log(JSON.parse(this.props.info));
        let Detalles = <DetallesTarea info={this.props.info} history={this.props.history}/>

       
        
        ReactDOM.render(Detalles,divDetallesTareas);
        }
        







    }




    getTitle=()=>{
        if(this.bandera==1 ){
           return "Activa"; 
        }else{
            return "Inactiva";
        }
        
    }




    cambiarEstado=()=>{
        let info = {
            id:this.info.InfoTarea._id,
            estado: this.info.InfoTarea.estado,
        }
        const res =  axios.put("http://localhost:4000/UpdateTarea", {
            data: info
        })
       
    }


    toogleC=()=>{
        console.log(this.bandera);

        
        if(this.bandera==0){
            this.info.InfoTarea.estado="A";
            document.getElementById(this.idBtnA1).setAttribute("title","Activa");
            document.getElementById(this.idBtnA).classList.toggle("fas");
            document.getElementById(this.idBtnA).classList.toggle("far");
            this.bandera++;
        }else{
            this.info.InfoTarea.estado="I";
            document.getElementById(this.idBtnA1).setAttribute("title","Inactiva");
            
            document.getElementById(this.idBtnA).classList.toggle("far");
            document.getElementById(this.idBtnA).classList.toggle("fas");
            this.bandera--;
        }
    
        console.log(this.info.InfoTarea);

        this.cambiarEstado();
       
    
    
    }



        


    render() {
        return (
            <div className="row tarea" >
                <div className="col">

                    <div className="card card-body">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{"height":"80%"}} id={this.idBtnA1}><button className=" btn btn-ligh" onClick={this.toogleC} ><i className="fas fa-check-circle" id={this.idBtnA} ></i></button></span>
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
