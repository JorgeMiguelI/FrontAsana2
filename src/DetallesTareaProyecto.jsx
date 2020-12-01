import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';


import Tarea from './Tarea';



export default class DetallesTareaDia extends Component {



    render() {
        return (
            <div id="multiCollapseExample3"  className=" multi-collapse">
            {
                  JSON.parse(this.props.tareas).map((item) =>
                        
                        <Tarea idT={"Calendario"+item.InfoTarea._id} info={JSON.stringify(item)} key={item.InfoTarea._id} history={this.props.history} EsDeproyecto={this.props.EsDeproyecto}/>
                     )
                }
            </div>
        )
    }
}


