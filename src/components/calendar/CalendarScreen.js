import React, { useState } from 'react';
import { NavBar } from '../ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-español';
import 'react-big-calendar/lib/css/react-big-calendar.css';


moment.locale('es');
const localizer = momentLocalizer(moment)
const myEventsList = [{
    title: 'Entrevista',
    body: 'comentarios',
    start: moment().toDate(),
    end: moment().add(2, 'hour').toDate(),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'jesus',
    },
    notes: [{
        active: false,
        text: "comprar pastel"
    },
    {
        active: true,
        text: "comprar agua"
    }]
}]

export const CalendarScreen = () => {

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView',e);
    }
    const onDoubleClick = (e) => {
        console.log(e);
    }

    const onSelectEvent = (e) => {
        console.log(e);
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    };
    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                style={{ height: 500 }}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent = {onDoubleClick}
                onSelectEvent = {onSelectEvent}
                onView = {onViewChange}
                view = {lastView}
                components={{
                    event: CalendarEvent
                }}
            />
        </div>
    )
}
