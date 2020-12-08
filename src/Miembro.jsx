import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';








export default class Miembro extends Component {



    render() {
        return (
            <div className="MiembroInf">
                <a onClick={()=>{this.props.history.push("/Perfil/"+this.props.Info._id)}}>{this.props.Info.nombre}</a>
                <small id="emailHelp" class="form-text text-muted">{this.props.Info.correo}</small>
            </div>

        )
    }
}


