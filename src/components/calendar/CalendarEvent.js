import React from 'react';

export const CalendarEvent = ({event}) => {
    
    const { title,notes,user } = event;
    
    return (
        <div>
            <span>{title}</span>
            <p>{notes}</p>
            <strong>- {user.name}</strong>
            
        </div>
    )
}
