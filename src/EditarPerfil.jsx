import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';



import Barra from './bar';
import Topbar from './topbar';




export default class EditarPerfil extends Component {


    idUser;
    correcto;
    contraseña;
    componentDidMount() {


        this.idUser = localStorage.getItem("ID");
        this.correcto=true;

        this.TraerUsuario();





    }
    componentDidUpdate() {
        this.idUser = localStorage.getItem("ID");
        this.correcto=true;




        this.TraerUsuario();
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
            this.contraseña=data.contraseña;


        }
    }

    checkContraseña = () => {
        var contraseña1 = document.getElementById("inputPassword").value;
        var constraseña2 = document.getElementById("inputConfirmPassword").value;
        if (contraseña1 == constraseña2) {
            if (document.getElementById("contraseñaIncorrecta").className != "form-text text-muted alert-danger d-none")
                document.getElementById("contraseñaIncorrecta").classList.add("d-none");
            this.correcto = true;

        } else {
            if (document.getElementById("contraseñaIncorrecta").className != "form-text text-muted alert-danger")
                document.getElementById("contraseñaIncorrecta").classList.remove("d-none");
            this.correcto = false;

        }

    }

    Guardar = async() => {
        if(document.getElementById("inputPassword").value==""){
            
        }else{
            this.contraseña=document.getElementById("inputPassword").value
        }

        if (this.correcto) {


            let info = {
                id: this.idUser,
                proyecto: [],
                nombre: document.getElementById("inputFirstName").value,
                usuario: document.getElementById("inputUser").value,
                correo: document.getElementById("inputEmailAddress").value,
                contraseña: this.contraseña


            };
            const res = await axios.put("http://localhost:4000/UpdateUser",{
                data: info
            });
            const result = await res.data;
            if (result.msg == "error") {
                //No se pudo actualizar
            } else {
                this.props.history.push("/Perfil/" + this.idUser);
            }
        }
    }
    Chectext=()=>{
        if(document.getElementById("inputPassword").value==""){
           
              document.getElementById("GuardarBtn").classList.add("d-none");
        }else{
            
            document.getElementById("GuardarBtn").classList.remove("d-none");
        }
    }

    ChecharSalida=()=>{
        
            if(document.getElementById("inputPassword").value==""){
                swal({
                    title: "LLenar campo contraseña",
                    text: "Favor de actualizar la contraseña",
                    icon: "warning",
                    button: "Cerrar",
                  });
            }else{
            
                document.getElementById("GuardarBtn").classList.remove("d-none");
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





                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputFirstName">Nombre</label>
                                            <input className="form-control py-4" id="inputFirstName" type="text" placeholder="Escriba su(s) nombre(s)" name="nombre" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputUser">Usuario</label>
                                            <input className="form-control py-4" id="inputUser" type="text" placeholder="Escriba su Usuario, ejemplo: JhonKX" name="usuario" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-row">

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                            <input className="form-control py-4" id="inputEmailAddress" type="email" placeholder="Escriba su correo" name="correo" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user" id="inputPassword" placeholder="Contraseña" onFocus={this.Chectext} onBlur={this.ChecharSalida}/>

                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user" id="inputConfirmPassword" placeholder="Confirmar Contraseña" onBlur={this.checkContraseña} />
                                        <small id="contraseñaIncorrecta" className="form-text text-muted alert-danger d-none">Contraseña incorrecta</small>
                                    </div>
                                </div>

                                <div className="form-row" style={{ padding: "1rem" }}>
                                    <button className="btn btn-primary btn-block" onClick={this.Guardar} id="GuardarBtn">Guardar</button>
                                </div>






                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


