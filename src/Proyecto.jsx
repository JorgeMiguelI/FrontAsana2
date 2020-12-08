import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';








export default class Proyecto extends Component {



    render() {
        return (
            <a onClick={()=>{this.props.history.push("/Detallesproyecto/"+this.props.Info._id)}}><h6> <font color={this.props.Info.color}><i className="fas fa-archive"></i></font><br />{this.props.Info.nombre}</h6></a>
        )
    }
}


