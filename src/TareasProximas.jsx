import React, { Component } from 'react'
import Tarea from './Tarea'

export default class TareasProximas extends Component {
    render() {
        return (
            <div className="card" style={{margin: ".7em"}}>
                <div>
                  <a className="" data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="true" aria-controls="multiCollapseExample2"><i className="fas fa-caret-down"></i>Tareas Próximas</a>
                </div>

                <div id="multiCollapseExample2"  className="collapse multi-collapse">
                    <Tarea/>
                </div>
                
                
            </div>
        )
    }
}
