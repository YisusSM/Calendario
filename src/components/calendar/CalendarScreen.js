import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../ui/NavBar';
import { DeleteEventFab } from '../ui/DeleteEvenFab';
import { AddNewFab } from '../ui/AddNewFab';
import { eventClearActiveEvent, eventSetActive, eventStartLoadign } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';
import { CalendarEvent } from './CalendarEvent';
import { messages } from '../../helpers/calendar-messages-español';
import { CalendarModal } from './CalendarModal';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';


moment.locale('es');
const localizer = momentLocalizer(moment)

// const myEventsList = [{
//     title: 'Entrevista',
//     body: 'comentarios',
//     start: moment().toDate(),
//     end: moment().add(2, 'hour').toDate(),
//     bgcolor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'jesus',
//     }
// }]
export const CalendarScreen = () => {
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);


    // const {modalOpen} = useSelector(state => state.ui)
    const dispatch = useDispatch();
    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')

    useEffect(() => {
        dispatch(eventStartLoadign());
    }, [dispatch])

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView', e);
    }
    const onDoubleClick = (e) => {

        dispatch(uiOpenModal());

    }

    const onSelectEvent = (e) => {

        dispatch(eventSetActive(e));

    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(uid)
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }


        return {
            style
        }
    };

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                style={{ height: 500 }}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            {(activeEvent) && <DeleteEventFab />}

            <CalendarModal />
        </div>
    )
}
