import React,{Component} from 'react';
import Render, { render } from 'react-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
window.$ = $;

class Login extends Component{

    constructor(props){
        super(props);
       
        
    }
    
    
    cambiar= function() {}
       

    ajax=(e)=>{
       
        console.clear();
        e.preventDefault();
        var formData = new FormData($("#Principal")[0]);
       
        
        $.ajax({
            context:this,
            Origin: "http://localhost:3000",
            url: 'http://localhost:8080/login',
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
}

export default Login;