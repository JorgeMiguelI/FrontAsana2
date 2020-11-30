import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';






export default class Calendario extends Component {
    monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
    

    currentDate;
    currentDay;
    monthNumber;
    currentYear;

    componentDidMount(){
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
                    dates.appendChild(divDia);
                } else {
                    divDia = document.createElement("div");
                    divDia.className = "calendar__date calendar__item";
                    divDia.appendChild(document.createTextNode(i));
                    dates.appendChild(divDia);
    
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

