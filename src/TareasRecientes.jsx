import React, { Component } from 'react'
import Tarea from './Tarea'

export default class TareasRecientes extends Component {
    render() {
        return (
            <div className="card" style={{margin: ".7em"}}>
                <div>
                  <a className="" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="true" aria-controls="multiCollapseExample1"><i className="fas fa-caret-down"></i>Agregadas recientemente</a>
                </div>
                
                <div id="multiCollapseExample1" className="collapse multi-collapse">
                    <Tarea/>
                </div>
                
            </div>
        )
    }
}
