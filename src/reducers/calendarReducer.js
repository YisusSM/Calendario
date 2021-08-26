import moment from 'moment'

const initialState = {
    events: [{
        title: 'Entrevista',
        body: 'comentarios',
        start: moment().toDate(),
        end: moment().add(2, 'hour').toDate(),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'jesus',
        }
    }],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {


        default:
            return state;
    }


};