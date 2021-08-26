import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDelete } from '../../actions/events';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();
    return (
        <button
        className = "btn btn-danger fab-danger"
        onClick = {()=>dispatch(eventDelete())}>
            <i className = "fas fa-trash"></i>
            <span> Borrar evento </span>
            
        </button>
    )
}
