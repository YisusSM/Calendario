import { types } from "../types/types";
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";


export const eventStartAddNew = (event) => {
    return async (dispatch,getState) => {
        const { uid,name } = getState().auth;
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            console.log(body);
            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log(event);
                dispatch(eventAddNew(event));

            }
        } catch (error) {
            console.log(error);
        }


        // dispatch(eventAddNew(event));
    }
}

 const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});
export const eventUpdated = (event) =>{
    return  async(dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventUpdate(event));
            }else {
                console.log(body);
                Swal.fire('Error',body.msg,'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}
 const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
});

export const eventDeleted = () => {
    return async (dispatch,getState) => {
        const {id} = getState().calendar.activeEvent;
        try {
           
            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventDelete());
            }else{
                Swal.fire('Error',body.msg,'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}
 const eventDelete = () => ({
    type: types.eventDelete
})

export const eventClean = () =>({
    type: types.eventLogout
})

export const eventStartLoadign = () => {
    return async (dispatch) =>{
        try {
            const resp = await fetchConToken('events');
            const {eventos} = await resp.json();
            
            const events = prepareEvents(eventos);
            
            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
} 

const eventLoaded = (event) => ({
    type:types.eventLoaded,
    payload: event
});