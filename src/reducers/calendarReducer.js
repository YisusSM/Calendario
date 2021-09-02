import { types } from '../types/types';

// {
//     id: 'id que se obtiene de la bd',
//     title: 'Entrevista',
//     notes: 'arreglarse',
//     start: moment().toDate(),
//     end: moment().add(2, 'hour').toDate(),
//     bgcolor: '#fafafa',
//     user: {
//         _id: 'se agarra del state',
//         name: 'se agarra del state',
//     }


const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            };

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id)? action.payload : e
                )
            };

        case types.eventLoaded:
            return {
                ...state,
                events:[...action.payload]
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }


};