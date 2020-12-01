import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';


import DetallesTareaDia from './DetallesTareaProyecto';



export default class Calendario extends Component {
    monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    Tareas;
    tareasMesActual;
    currentDate;
    currentDay;
    monthNumber;
    currentYear;

    componentDidMount() {

        if (this.props.tareas != "") {
            this.Tareas = JSON.parse(this.props.tareas);

        }



        this.cargarCalendario();
    }

    cargarCalendario = () => {
        this.currentDate = new Date();
        this.currentDay = this.currentDate.getDate();
        this.monthNumber = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();

        let dates = document.getElementById('dates');
        let month = document.getElementById('month');
        let year = document.getElementById('year');



        month.appendChild(document.createTextNode(this.monthNames[this.monthNumber]));
        year.appendChild(document.createTextNode(this.currentYear.toString()));
        this.setCalendar(this.monthNumber);
    }


    setCalendar = (month1) => {
        let dates = document.getElementById('dates');
        let month = document.getElementById('month');
        let year = document.getElementById('year');


        let divDia;
        let dia;
        let botonDetalles;


        this.tareasMesActual = new Array();
        for (let i = 0; i < 31; i++) {
            this.tareasMesActual.push(new Array());
        }


        for (let tarea of this.Tareas[month1]) {
            let fecha_tarea = new Date(tarea.InfoTarea.fecha_entrega);

            let dia = fecha_tarea.getDate();

            //  console.log(dia);
            let añoT = fecha_tarea.getFullYear();
            if (añoT == this.currentYear) {
                this.tareasMesActual[dia].push(tarea);
            }
        }
        //console.log( this.tareasMesActual);

        for (let i = this.startDay(); i > 0; i--) {

            divDia = document.createElement("div");
            divDia.className = "calendar__date calendar__item calendar__last-days";
            divDia.appendChild(document.createTextNode(this.getTotalDays(this.monthNumber - 1) - (i - 1)));


            dates.appendChild(divDia);
        }

        for (let i = 1; i <= this.getTotalDays(month1); i++) {



            if (i === this.currentDay) {
                divDia = document.createElement("div");
                divDia.className = "calendar__date calendar__item calendar__today";
                divDia.appendChild(document.createTextNode(i));
                if (botonDetalles != null) {
                    divDia.appendChild(document.createElement("br"));
                    divDia.appendChild(botonDetalles);
                }

                dates.appendChild(divDia);
            } else {
                divDia = document.createElement("div");
                divDia.setAttribute("id", "Dia" + i);
                divDia.className = "calendar__date calendar__item";
                divDia.appendChild(document.createTextNode(i));
                if (botonDetalles != null) {
                    divDia.appendChild(document.createElement("br"));
                    divDia.appendChild(botonDetalles);
                }
                dates.appendChild(divDia);

            }
        }


        for (let cont = 0; cont < this.tareasMesActual.length; cont++) {
            if (this.tareasMesActual[cont].length != 0) {
                //console.log(cont);
                let id = "Dia" + (cont + 1);
                let celda = document.getElementById(id);



                botonDetalles = document.createElement("button");
                let icon=document.createElement("i");
                icon.className="fas fa-eye"
                icon.setAttribute("value",cont);
                botonDetalles.appendChild(icon);
                botonDetalles.className = "btn btn-ligh";
                botonDetalles.setAttribute("value", cont);
                botonDetalles.addEventListener("click", (e) => {

                    if (document.getElementById("DetallesTarea").hasChildNodes()) {
                        ReactDOM.unmountComponentAtNode(document.getElementById("DetallesTarea"));
                    }
                    
                    let element=e.target.className;
                    
                    let DetallesDia;
                    if(element=="btn btn-ligh"){
                        
                        DetallesDia= e.target.value;
                    }else{
                        let elementoPadre;
                        if(e.target.className.baseVal!=""){
                            elementoPadre =e.target.parentElement.value
                        }else{
                            elementoPadre=e.target.parentElement.parentElement.value
                        }
                         
                        //console.log(elementoPadre);
                        DetallesDia = elementoPadre;
                    }
                    
                   //console.log(this.tareasMesActual[DetallesDia]);
                    
                    let DetallesDiaBox=<DetallesTareaDia tareas={JSON.stringify(this.tareasMesActual[DetallesDia])} EsDeproyecto={true} history={this.props.history}/>
                    let container=document.getElementById("DetallesTarea");
                    ReactDOM.render(DetallesDiaBox,container);
                });
                celda.appendChild(document.createElement("br"));

                celda.appendChild(botonDetalles);







            }

        }




    }

    getTotalDays = (month) => {
        if (month === -1) month = 11;

        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
            return 31;

        } else if (month == 3 || month == 5 || month == 8 || month == 10) {
            return 30;

        } else {

            return this.isLeap() ? 29 : 28;
        }
    }
    isLeap = () => {
        return ((this.currentYear % 100 !== 0) && (this.currentYear % 4 === 0) || (this.currentYear % 400 === 0));
    }
    lastMonth = () => {
        if (this.monthNumber !== 0) {
            this.monthNumber--;
        } else {
            this.monthNumber = 11;
            this.currentYear--;
        }

        this.setNewDate();
    }
    nextMonth = () => {
        if (this.monthNumber !== 11) {
            this.monthNumber++;
        } else {
            this.monthNumber = 0;
            this.currentYear++;
        }

        this.setNewDate();
    }

    setNewDate = () => {
        this.currentDate.setFullYear(this.currentYear, this.monthNumber, this.currentDay);
        let dates = document.getElementById('dates');
        let month = document.getElementById('month');
        let year = document.getElementById('year');
        month.textContent = this.monthNames[this.monthNumber];
        year.textContent = this.currentYear.toString();
        dates.textContent = '';
        this.setCalendar(this.monthNumber);
    }
    startDay = () => {
        let start = new Date(this.currentYear, this.monthNumber, 1);
        return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
    }

    render() {
        return (
            <div class="calendar">
                <div class="calendar__info">
                    <div class="calendar__prev" id="prev-month" onClick={this.lastMonth}>&#9664;</div>
                    <div class="calendar__month" id="month"></div>
                    <div class="calendar__year" id="year"></div>
                    <div class="calendar__next" id="next-month" onClick={this.nextMonth}>&#9654;</div>
                </div>

                <div class="calendar__week">
                    <div class="calendar__day calendar__item">Lu.</div>
                    <div class="calendar__day calendar__item">Ma.</div>
                    <div class="calendar__day calendar__item">Mi.</div>
                    <div class="calendar__day calendar__item">Ju.</div>
                    <div class="calendar__day calendar__item">Vi.</div>
                    <div class="calendar__day calendar__item">Sa.</div>
                    <div class="calendar__day calendar__item">Do.</div>
                </div>

                <div class="calendar__dates" id="dates"></div>
            </div>
        )
    }
}

