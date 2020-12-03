import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';



import Barra from './bar';
import Topbar from './topbar';




export default class Invitacion extends Component {




    MandarCorreos=async()=>{
        let idEmpresa= localStorage.getItem("IdEmpresa");
        let ListaCorreos=document.getElementById("inputCorreos").value.split(",");
        console.log(ListaCorreos);
        let info= {
            empresa: idEmpresa,
            Correos: ListaCorreos
        };
       const res=await axios.post("http://localhost:4000/SendMail", {
            data: info
        })
        if(res.data.msg=="error"){
            swal({
                title: "Error al mandar correos!!",
                text: "No se pudieron Mandar los Correos",
                icon: "warning",
                button: "Cerrar",
              });
            alert("");
        }else if(res.data.msg=="Ok"){
            this.props.history.push("/principal");
        }
    }


    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar />

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div id="cards" className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Invitar colabradores</h3></div>
                            <div className="card-body">

                                
                                <div className="form-row">

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputCorreos">Correos</label>
                                            <textarea className="form-control py-3" id="inputCorreos" placeholder="Escriba los correos de sus colaboradores separados por una coma" name="correos"></textarea>
                                        </div>
                                    </div>
                                    

                                </div>




                                <div className="form-group mt-4 mb-0"><button id="crearP" className="btn btn-block" onClick={() => {
                                    this.MandarCorreos();
                                }}>Invitar Colaboradores</button></div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


