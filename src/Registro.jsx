import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';
window.$ = $;

export default class Registro extends Component {

    
   
       
    constructor(props){
        super(props)
        this.state = {
            correcto: false,
            progreso: 0
        };
    }


    checkContraseña=()=>{
        var contraseña1=document.getElementById("inputPassword").value;
        var constraseña2=document.getElementById("inputConfirmPassword").value;
        if(contraseña1==constraseña2){
            if(document.getElementById("contraseñaIncorrecta").className!="form-text text-muted alert-danger d-none")
                document.getElementById("contraseñaIncorrecta").classList.add("d-none");
            this.setState({'correcto':true});
        }else{
            if(document.getElementById("contraseñaIncorrecta").className!="form-text text-muted alert-danger")
                document.getElementById("contraseñaIncorrecta").classList.remove("d-none");
            this.setState({'correcto':false});
        }

    }

    getArea=()=>{
        var progreso= this.state.progreso;
        var estilo={
            width: progreso

        };


        return estilo;
    }



   






    ajax=(e)=>{
        this.setState({progreso:0});
        this.setState({progreso:100});

        document.getElementById("ProgressBar").style.width=100;


        e.preventDefault();
        if(this.state.correcto){
            console.log("--------Registro--------");
           
            var formData = new FormData($("#Principal")[0]);
            
            
            this.setState({progreso:300});
            document.getElementById("ProgressBar").style.width=300;
            $.ajax({
                Origin: "http://localhost:3000",
                url: 'http://localhost:4000/registro',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (respuesta) {
                    console.log(respuesta);

                    if(respuesta=="Registro Correcto"){
                       
                        document.getElementById("ProgressBar").style.width=600;
                        setTimeout(function(){ 
                            window.location.href="/";
                         }, 3000);
                       
                       
                    }
                    //console.log(JSON.parse(respuesta));
    
    
                }
            });
           
        }else{
            alert("Contraseñas no coinciden");
        }
       

    }
    redireccionar(){
        setTimeout(function(){ 
            this.props.history.push('/') ;
         }, 3000);
    }



    render() {
        return (
            <div className="bg-primary">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                            <div className="card-body">
                                                <form id="Principal">
                                                    
                                                        <div className="progress">
                                                        <div id="ProgressBar" className="progress-bar bg-success" role="progressbar" style={this.getArea()} ></div>
                                                        </div>
                                                    
                                                    <div className="form-row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputFirstName">Nombre</label>
                                                                <input className="form-control py-4" id="inputFirstName" type="text" placeholder="Escriba su(s) nombre(s)" name="nombre" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputLastName">Apellidos</label>
                                                                <input className="form-control py-4" id="inputLastName" type="text" placeholder="Escriba su(s) apellido(s)" name="apellidos" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputUser">Usuario</label>
                                                                <input className="form-control py-4" id="inputUser" type="text" placeholder="Escriba su Usuario, ejemplo: JhonKX" name="usuario" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                                <input className="form-control py-4" id="inputEmailAddress" type="email"  placeholder="Escriba su correo" name="correo" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputOrganization">Organización</label>
                                                                <input className="form-control py-4" id="inputOrganization" type="text" placeholder="Escriba el código de su organización" name="organizacion" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputEmpresa">Crear Nuevo</label>
                                                                <input className="form-control py-4" id="inputEmpresa" type="text" placeholder="Escriba nombre de la empresa" name="empresa" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputPassword">Contraseña</label>
                                                                <input className="form-control py-4" id="inputPassword" type="password" placeholder="Ingrese contraseña" name="password" />
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="small mb-1" htmlFor="inputConfirmPassword">Confirmar Contraseña</label>
                                                                <input className="form-control py-4" id="inputConfirmPassword" type="password" placeholder="Confirmar contraseña" onBlur={this.checkContraseña}/>
                                                                <small id="contraseñaIncorrecta" className="form-text text-muted alert-danger d-none">Contraseña incorrecta</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group mt-4 mb-0"><button className="btn btn-primary btn-block" onClick={this.ajax}>Crear Cuenta</button></div>
                                                </form>
                                            </div>
                                            <div className="card-footer text-center">
                                                <div className="small"><Link to="/">¿Ya tienes cuenta? Inicia sesión</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>

                </div>

            </div>
        )
    }
}
