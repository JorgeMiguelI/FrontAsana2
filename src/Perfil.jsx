import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';



import Barra from './bar';
import Topbar from './topbar';




export default class Perfil extends Component {

    
    idUser;
    componentDidMount() {

        if (this.props.match.params.id != void (0)) {
            this.idUser = this.props.match.params.id;
        } else {
            this.idUser = localStorage.getItem("ID");
        }

        this.TraerUsuario();

        



    }
    componentDidUpdate(){
        if (this.props.match.params.id != void (0)) {
            this.idUser = this.props.match.params.id;
        } else {
            this.idUser = localStorage.getItem("ID");
        }

        this.TraerUsuario();
    }



    TraerEmpresa=async(idEmpresa)=>{
        
        const res= await axios.get("http://localhost:4000/GetEmpresa/"+ idEmpresa);
        const data= await res.data;
        if(data.msg=="error"){
            alert("No se pudo traer la empresa");
        }else{
            document.getElementById("inputOrganization").setAttribute("value", data.nombre);
        }
    }



    TraerUsuario = async () => {
        let idUsuario = this.idUser;
        const resp = await axios.get("http://localhost:4000/GetColaborador/" + idUsuario);
        const data = await resp.data;
        if (data.msg == "error") {
            //no se pudo traer el usuario
        } else {

            document.getElementById("inputFirstName").setAttribute("value", data.nombre);
            document.getElementById("inputUser").setAttribute("value", data.usuario);
            document.getElementById("inputEmailAddress").setAttribute("value", data.correo);

            
            this.TraerEmpresa(data.organizacion);





        }
    }


    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar history={this.props.history} />

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div id="cards" className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Perfil</h3></div>
                            <div className="card-body">

                                <form id="Principal">



                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputFirstName">Nombre</label>
                                                <input className="form-control py-4" id="inputFirstName" type="text" placeholder="Escriba su(s) nombre(s)" name="nombre" readOnly/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputUser">Usuario</label>
                                                <input className="form-control py-4" id="inputUser" type="text" placeholder="Escriba su Usuario, ejemplo: JhonKX" name="usuario" readOnly/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-row">

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                <input className="form-control py-4" id="inputEmailAddress" type="email" placeholder="Escriba su correo" name="correo"readOnly />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputOrganization">Organización</label>
                                                <input className="form-control py-4" id="inputOrganization" type="text" placeholder="Escriba el código de su organización" name="organizacion" readOnly/>
                                            </div>
                                        </div>
                                    </div>




                                </form>
                                {localStorage.getItem("ID")==this.props.match.params.id?<button className="btn btn-primary btn-block" onClick={()=>{this.props.history.push("/EditarPerfil")}} >Editar</button>:<div></div>}
                                
                            </div>

                        </div>
                    </div>
                </div>
                </div>
        )
    }
}


