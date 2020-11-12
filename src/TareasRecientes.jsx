import React, { Component } from 'react'
import Tarea from './Tarea'

export default class TareasRecientes extends Component {
    items;
    componentDidMount() {
        //console.log("--- recientes ----");
       // console.log(this.props.tareas);
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
            <div className="card" >
                <div>
                    <a className="" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="true" aria-controls="multiCollapseExample1"><i className="fas fa-caret-down"></i>Agregadas Proximas</a>
                </div>

                <div id="multiCollapseExample1" className="collapse multi-collapse">
                   {
                      JSON.parse(this.props.tareas).map((item) =>
                            <Tarea idT={item.InfoTarea._id} info={JSON.stringify(item)} key={item.InfoTarea._id} history={this.props.history} />
                         )
                    }
                </div>
            </div>
        )
    }
}
