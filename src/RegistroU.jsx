import React, { Component , useState} from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import swal from 'sweetalert'
import { useForm } from "react-hook-form";



export default function RegistroU(props){

    const {register,errors} = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
      })


    const [datos, setState] = useState({
        correcto:false,
        progreso:0
    });


    const [data, setData] = useState({
        nombre:'',
        apellidos:'',
        usuario:'',
        correo:'',
        organizacion:'',
        empresa:'',
        password:''
    });


    const handleInputChange=async(event)=>{
        await setData({
            ...data,
            [event.target.name]:event.target.value
            
        })

       




        
        
    }


    const checkContraseña=()=>{
        var contraseña1=document.getElementById("inputPassword").value;
        var constraseña2=document.getElementById("inputConfirmPassword").value;
        if(contraseña1==constraseña2){
            if(document.getElementById("contraseñaIncorrecta").className!="form-text text-muted alert-danger d-none")
                document.getElementById("contraseñaIncorrecta").classList.add("d-none");
                setState({...datos,
                    correcto:true
                });
                
        }else{
            if(document.getElementById("contraseñaIncorrecta").className!="form-text text-muted alert-danger")
                document.getElementById("contraseñaIncorrecta").classList.remove("d-none");
                setState({correcto:false});
                
        }

    }




    const ajax=(e)=>{
        setState({progreso:0});
        setState({progreso:100});
        

       


        e.preventDefault();
        if(datos.correcto){
            console.log("--------Registro--------");
           
            var formData = new FormData($("#Principal")[0]);
            
            
            setState({progreso:300});
            
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

                    if(respuesta=="Usuario Guardado" || respuesta=="Registro Correcto"){
                        setState({progreso:600});
                        
                        setTimeout(function(){ 
                            props.history.push("/");
                         }, 3000);
                       
                       
                    }else{
                        swal({
                            title: "Error",
                            text: "No se pudo realizar la operación",
                            icon: "warning",
                            button: "Cerrar",
                          });
                    }
                    //console.log(JSON.parse(respuesta));
    
    
                }
            });
           
        }else{
            alert("Contraseñas no coinciden");
        }
       

    }


  

    return (
        <div className="bg-primary">
            <div id="layoutAuthentication1">
                <div id="layoutAuthentication_content">
                    <main>
                    <div class="container">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                                <div class="row">
                                    <div class="col-lg-5 d-none d-lg-block bg-register-image" id="registroUser"></div>
                                    <div class="col-lg-7">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Crea una Cuenta!</h1>
                                            </div>
                                            <form class="user" id="Principal">
                                                <div class="form-group row">
                                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                                        <input type="text" class="form-control form-control-user" id="inputFirstName"
                                                            placeholder="Nombre"
                                                            name="nombre"
                                                            ref={register({
                                                                required: true,
                                                                minLenght: 1,
                                                                pattern: /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/
                                                            })}
                                                            />
                                                            {errors.nombre?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                            {errors.nombre?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                                            {errors.nombre?.type === "pattern" && (<small  className="form-text text-muted alert-danger ">Solo letras</small>)}
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control form-control-user" id="inputLastName"
                                                            placeholder="Apellidos"
                                                            name="apellidos"
                                                            ref={register({
                                                                required: true,
                                                                minLength: 1,
                                                                pattern: /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/
                                                            })}
                                                            />
                                                            {errors.apellidos?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                            {errors.apellidos?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                                            {errors.apellidos?.type === "pattern" && (<small  className="form-text text-muted alert-danger ">Solo letras</small>)}
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" class="form-control form-control-user" id="inputUser"
                                                        placeholder="Usuario"
                                                        name="usuario"
                                                        ref={register({
                                                            required: true,
                                                            minLength: 1
                                                        })}
                                                        />
                                                        {errors.usuario?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                        {errors.usuario?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                                    
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <input type="email" class="form-control form-control-user" id="inputEmailAddress"
                                                        placeholder="Email Address"
                                                        name="correo"
                                                        ref={register({
                                                            required: true,
                                                            minLength: 1
                                                        })}
                                                        />
                                                        {errors.correo?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                        {errors.correo?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                                    </div>
                                                    
                                                </div>

                                                <div class="form-group row">
                                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" class="form-control form-control-user" id="inputOrganization"
                                                        placeholder="Codigo Organizacion"
                                                        name="organizacion"
                                                        />
                                                    
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control form-control-user" id="inputEmpresa"
                                                        placeholder="Nombre Empresa"
                                                        name="empresa"
                                                        />
                                                    </div>
                                                    
                                                </div>

                                                <div class="form-group row">
                                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                                        <input type="password" class="form-control form-control-user"
                                                            id="inputPassword" placeholder="Contraseña"
                                                            name="password"
                                                            ref={register({
                                                                required: true,
                                                                minLength: 8
                                                            })}
                                                            />
                                                            {errors.password?.type === "required" && (<small id="contraseñaIncorrecta" className="form-text text-muted alert-danger ">Contraseña requerida</small>)}
                                                             {errors.password?.type === "minLength" && (<small id="contraseñaIncorrecta" className="form-text text-muted alert-danger ">Contraseña debe tener mínimo 8 carácteres</small>)}
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <input type="password" class="form-control form-control-user"
                                                            id="inputConfirmPassword" placeholder="Confirmar Contraseña"
                                                            onBlur={checkContraseña}
                                                            />
                                                            <small id="contraseñaIncorrecta" className="form-text text-muted alert-danger d-none">Contraseña incorrecta</small>
                                                    </div>
                                                </div>
                                               
                                            </form>
                                            <button className="btn btn-primary btn-block" onClick={ajax} form="Principal">Crear Cuenta</button>
                                            <hr/>
                                            <div class="text-center">
                                                <a class="small" href="#">Olvidaste tu contraseña?</a>
                                            </div>
                                            <div class="text-center">
                                            <Link class="small" to="/">¿Ya tienes cuenta? Inicia sesión</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </div>
                        
                        {/*<div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <div className="card shadow-lg border-0 rounded-lg my-3">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                        <div className="card-body">
                                            <form id="Principal">
                                                
                                                    <div className="progress">
                                                    <div id="ProgressBar" className="progress-bar bg-success" role="progressbar"  ></div>
                                                    </div>
                                                
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputFirstName">Nombre</label>
                                                            <input className="form-control py-4" id="inputFirstName" type="text" placeholder="Escriba su(s) nombre(s)" name="nombre" ref={register({
                                                                required:true,
                                                                minLength:1,
                                                                pattern:/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/
                                                            })}/>
                                                            {errors.nombre?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                            {errors.nombre?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                                            {errors.nombre?.type === "pattern" && (<small  className="form-text text-muted alert-danger ">Solo letras</small>)}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputLastName">Apellidos</label>
                                                            <input className="form-control py-4" id="inputLastName" type="text" placeholder="Escriba su(s) apellido(s)" name="apellidos" ref={register({
                                                                required:true,
                                                                minLength:1,
                                                                pattern:/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/
                                                            })}/>
                                                            {errors.apellidos?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                            {errors.apellidos?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                                            {errors.apellidos?.type === "pattern" && (<small  className="form-text text-muted alert-danger ">Solo letras</small>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputUser">Usuario</label>
                                                            <input className="form-control py-4" id="inputUser" type="text" placeholder="Escriba su Usuario, ejemplo: JhonKX" name="usuario" ref={register({
                                                                required:true,
                                                                minLength:1,
                                                                
                                                            })}/>
                                                            {errors.usuario?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                            {errors.usuario?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                            <input className="form-control py-4" id="inputEmailAddress" type="email"  placeholder="Escriba su correo" name="correo" ref={register({
                                                                required:true,
                                                                minLength:1,
                                                                
                                                            })}/>
                                                            {errors.correo?.type === "required" && (<small  className="form-text text-muted alert-danger ">Campo requerido</small>)}
                                                            {errors.correo?.type === "minLength" && (<small  className="form-text text-muted alert-danger ">Debe tener minimo 1 caracter</small>)}
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
                                                            <input className="form-control py-4" id="inputPassword" type="password" placeholder="Ingrese contraseña" name="password" ref={register({
                                                                required:true,
                                                                minLength:8,
                                                                
                                                            })}/>
                                                             {errors.password?.type === "required" && (<small id="contraseñaIncorrecta" className="form-text text-muted alert-danger ">Contraseña requerida</small>)}
                                                             {errors.password?.type === "minLength" && (<small id="contraseñaIncorrecta" className="form-text text-muted alert-danger ">Contraseña debe tener mínimo 8 carácteres</small>)}
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputConfirmPassword">Confirmar Contraseña</label>
                                                            <input className="form-control py-4" id="inputConfirmPassword" type="password" placeholder="Confirmar contraseña" onBlur={checkContraseña}/>
                                                            <small id="contraseñaIncorrecta" className="form-text text-muted alert-danger d-none">Contraseña incorrecta</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mt-4 mb-0"><button className="btn btn-primary btn-block" onClick={ajax}>Crear Cuenta</button></div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center">
                                            <div className="small"><Link to="/">¿Ya tienes cuenta? Inicia sesión</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>*/}
                    </main>
                </div>

            </div>

        </div>
    )
}