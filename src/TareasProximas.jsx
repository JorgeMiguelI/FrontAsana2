import React, { Component } from 'react'
import Tarea from './Tarea'

export default class TareasProximas extends Component {
    items;
    componentDidMount() {

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
        console.log(this.items);

    }




    render() {
        return (
            <div className="card" style={{margin: ".7em"}}>
                <div>
                  <a className="" data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="true" aria-controls="multiCollapseExample2"><i className="fas fa-caret-down"></i>Tareas Próximas</a>
                </div>

                <div id="multiCollapseExample2"  className="collapse multi-collapse">
                {
                      JSON.parse(this.props.tareas).map((item) =>
                            <Tarea idT={item._id} info={JSON.stringify(item)} />
                         )
                    }
                </div>
                
                
            </div>
        )
    }
}
