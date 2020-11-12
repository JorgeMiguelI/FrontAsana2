import React, { Component } from 'react'
import Tarea from './Tarea'

export default class TareasProximas extends Component {
    items;
    componentDidMount() {
        //console.log("--- proximas ----");
        //console.log(this.props.tareas);
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
        //console.log(this.items);

    }




    render() {
        return (
            <div className="card" >
                <div>
                  <a className="" data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="true" aria-controls="multiCollapseExample2"><i className="fas fa-caret-down"></i>Tareas para más tarde</a>
                </div>

                <div id="multiCollapseExample2"  className="collapse multi-collapse">
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
