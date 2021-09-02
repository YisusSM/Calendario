import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventUpdated} from '../../actions/events';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');


const now = moment().minutes(0).seconds(0).add(1, "hours");


const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}
export const CalendarModal = () => {


    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch();
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {

        if (activeEvent) {

            setFormValues(activeEvent);

        } else {
            setFormValues(initEvent);
        }

    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
    // console.log(dateEnd)

    const handleStartDateChange = (e) => {
        if (activeEvent) {
            activeEvent.start = e
            setFormValues({
                ...formValues,
                start: activeEvent.start
            })
        } else {
            setDateStart(e);
            setFormValues({
                ...formValues,
                start: e
            })
        }
    }
    const handleEndDateChange = (e) => {
        if (activeEvent) {
            activeEvent.end = e
            setFormValues({
                ...formValues,
                start: activeEvent.end
            })
        }
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }
    const closeModal = () => {
        //TODO cerrar modal
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        var momentStart = moment(start);
        var momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'Fecha de finalización no puede ser menor o igual a la de inicio...', 'error');

        }

        if (title.length < 2) {
            return setTitleValid(false)
        }

        //TODO realizar grabación a bd
        if (activeEvent) {
            dispatch(eventUpdated(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }


        setTitleValid(true);
        closeModal();

    }

    // console.log(titleValid, title);
    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {(activeEvent) ? "Editar Evento" : "Nuevo evento"} </h1>
            <hr />
            <form className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={(activeEvent) ? activeEvent.start : dateStart}
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select AM/PM"
                        className="form-control"

                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={(activeEvent) ? activeEvent.end : dateEnd}
                        minDate={dateStart}
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select AM/PM"
                        className="form-control"

                    />

                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
