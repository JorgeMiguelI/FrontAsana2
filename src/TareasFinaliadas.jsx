import React, { Component } from 'react'
import Tarea from './Tarea'

export default class TareasFinalizadas extends Component {
    items;
    componentDidMount() {
       

    }




    render() {
        return (
            <div className="card" >
                <div>
                  <a className="" data-toggle="collapse" href="#multiCollapseExample4" role="button" aria-expanded="true" aria-controls="multiCollapseExample4"><i className="fas fa-caret-down"></i>Tareas Finalizadas</a>
                </div>

                <div id="multiCollapseExample4"  className="collapse multi-collapse">
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