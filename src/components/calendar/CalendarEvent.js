import React from 'react';

export const CalendarEvent = ({event}) => {
    
    const { title,body,user } = event;
    
    return (
        <div>
            <span>{title}</span>
            <p>{body}</p>
            <strong>- {user.name}</strong>
            
        </div>
    )
}
