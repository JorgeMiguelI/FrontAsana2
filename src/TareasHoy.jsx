import React, { Component } from 'react'
import Tarea from './Tarea'

export default class TareasHoy extends Component {
    items;
    componentDidMount() {
        console.log("--- hoy ----");
        console.log(this.props.tareas);
        if (this.props.tareas != "") {

            //this.items="Revisando";
            let tareas = JSON.parse(this.props.tareas);
            console.log(tareas);
            this.items = tareas.map((item) =>
                <Tarea idT={item._id} info={item} />
            );
        } else {
            this.items = "No homeworks"
        }
       // console.log(this.items);

    }




    render() {
        return (
            <div className="card" style={{margin: ".7em"}}>
                <div>
                  <a className="" data-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="true" aria-controls="multiCollapseExample3"><i className="fas fa-caret-down"></i>Tareas Hoy</a>
                </div>

                <div id="multiCollapseExample3"  className="collapse multi-collapse">
                {
                      JSON.parse(this.props.tareas).map((item) =>
                            <Tarea idT={item.InfoTarea._id} info={JSON.stringify(item)} key={item.InfoTarea._id} />
                         )
                    }
                </div>
                
                
            </div>
        )
    }
}