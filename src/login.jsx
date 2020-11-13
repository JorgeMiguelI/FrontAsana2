import React,{Component, useState} from 'react';
import Render, { render } from 'react-dom';
import { Link } from 'react-router-dom';
import $, { get } from 'jquery';
import axios from 'axios';
import swal from 'sweetalert'
import { useForm } from "react-hook-form";
window.$ = $;

function Login(props){
    const {register, errors}= useForm();
    const[datos, setDatos]= useState({
        correo: "",
        password: ""
    });

    const handleInputChange= async(event)=>{
        await setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        if(datos.correo!=""){
            document.getElementById("errCorreo").style.display="none";
        }
        if(datos.password!=""){
            document.getElementById("errPass").style.display="none";
        }
    }

    const EnviarData= async(event)=>{
        event.preventDefault();//Quitamos el procesamiento automatico

        //Validaciones
        if(datos.correo==""){
            document.getElementById("errCorreo").style.display="block";
            document.getElementById("errCorreo").innerHTML="Ingresa el correo";
        }else if(datos.password==""){
            document.getElementById("errPass").style.display="block";
            document.getElementById("errPass").innerHTML="Ingresa la contraseña";
        }else{

            //Consumimos la API para loguearnos
        const res= await axios.get("http://localhost:4000/login", {
            params: datos
        })
        const data= res.data;
        if (data.data =="no encontrado"){
            swal({
                title: "Error al iniciar sesión!!",
                text: "El usuario o contraseña son incorrectos",
                icon: "warning",
                button: "Cerrar",
              });

        }else if(data.data == "error"){
            swal({
                title: "Error",
                text: "No se pudo buscar el usuario",
                icon: "warning",
                button: "Cerrar",
              });
        }else{
            console.log(data);
            localStorage.setItem("IdEmpresa",data.organizacion);
            localStorage.setItem("ID",data._id);
           props.history.push("/principal");
        }
        

        }

    }

    return (
        <div className="bg-primary" id="back">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                <div class="container">
                    <div class="row justify-content-center">

                        <div class="col-xl-10 col-lg-12 col-md-9">

                            <div class="card o-hidden border-0 shadow-lg my-4">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col-lg-6 d-none d-lg-block bg-login-image" id="back2"></div>
                                        <div class="col-lg-6">
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4">Bienvenido!</h1>
                                                </div>
                                                <form class="user" onSubmit={EnviarData}>
                                                    <div class="form-group">
                                                        <input type="email" class="form-control form-control-user"
                                                            id="inputEmailAddress" aria-describedby="emailHelp"
                                                            placeholder="Ingresa Usuario o Correo..."
                                                            name="correo"
                                                            onChange={handleInputChange}
                                                            />
                                                            <span className="alert alert-danger" role="alert" id="errCorreo" >
                                                            </span>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="password" class="form-control form-control-user"
                                                            id="exampleInputPassword" placeholder="Contraseña"  name="password" onChange={handleInputChange}/>
                                                            <span className="alert alert-danger" role="alert" id="errPass" >
                                                    
                                                    </span>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="custom-control custom-checkbox small">
                                                            <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                            <label class="custom-control-label" for="customCheck">Remember
                                                                Me</label>
                                                        </div>
                                                    </div>
                                                    <button class="btn btn-primary btn-user btn-block" type="submit">
                                                        Login
                                                    </button>
                                                    <hr/>
                                                    <a href="index.html" class="btn btn-google btn-user btn-block">
                                                        <i class="fab fa-google fa-fw"></i> Login with Google
                                                    </a>
                                                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                                        <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                    </a>
                                                </form>
                                                <hr/>
                                                <div class="text-center">
                                                    <a class="small" href="#">Olvidaste tu contraseña?</a>
                                                </div>
                                                <div class="text-center">
                                                    <Link to="/registro" className="small">No tienes cuenta? Crea una ahora!</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2020</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>


        /*<div className="bg-primary" id="back">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={EnviarData}>
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Usuario o Contraseña</label>
                                                <input
                                                className="form-control py-4"
                                                id="inputEmailAddress"
                                                type="text" 
                                                placeholder="Enter User o email address "
                                                name="correo" 
                                                onChange={handleInputChange} />
                                                <span className="alert alert-danger" role="alert" id="errCorreo" >
                                                </span>
                                                
                                            </div>
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputPassword">Contraseña</label>
                                                <input 
                                                className="form-control py-4" 
                                                id="inputPassword" 
                                                type="password" 
                                                placeholder="Enter password"  
                                                name="password" 
                                                onChange={handleInputChange} />
                                                <span className="alert alert-danger" role="alert" id="errPass" >
                                                    
                                                </span>
                                            </div>
                                            
                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">¿Olvidaste la contraseña?</a>
                                                <button className="btn btn-primary"  type="submit">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="small"><Link to="/registro">Need an account? Sign up!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2020</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>*/
    )
    
}

/*class Login extends Component{

    constructor(props){
        super(props);
    }
    
    
    cambiar= function() {}

    Login(e){
        e.preventDefault();
        var formData = new FormData($("#Principal")[0]);
        alert(JSON.stringify(formData));
    }

    ajax=(e)=>{
        console.clear();
        e.preventDefault();
        var formData = new FormData($("#Principal")[0]);
       
        
        $.ajax({
            context:this,
            Origin: "http://localhost:3000",
            url: 'http://localhost:4000/login',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                console.log(this);
                if(respuesta =="1"){
                    alert("Usuario o correo incorrectos");
                    console.log("Usuario o correo incorrectos");
                }else if(respuesta=="2"){
                    alert("Contraseña incorrecta");
                    console.log("Contraseña incorrecta");
                }else{
                    var resp=JSON.parse(respuesta);
                    console.log(resp);
                    localStorage.setItem("IdEmpresa",resp.organizacion);
                    localStorage.setItem("ID",resp._id);
                    this.props.history.push("/principal");
                   // window.location.href="/principal";
                    //cambiar();
                }
                


            }
        });

    }



    render(){
        return (
        <div className="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form id="Principal" encType="multipart/form-data">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Usuario o Contraseña</label>
                                                <input className="form-control py-4" id="inputEmailAddress" type="text" placeholder="Enter User o email address " name="correo" />
                                            </div>
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputPassword">Contraseña</label>
                                                <input className="form-control py-4" id="inputPassword" type="password" placeholder="Enter password"  name="contraseña" />
                                            </div>
                                            
                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">¿Olvidaste la contraseña?</a>
                                                <button className="btn btn-primary" onClick={this.ajax} type="submit">Login</button>
                                                
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="small"><Link to="/registro">Need an account? Sign up!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2020</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
        )
    }
}*/

export default Login;