import React, {createRef, useState} from 'react';
import './App.css';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventForm from './AddEventForm';

import shortid from 'shortid';

import Alert from 'sweetalert2';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const calendarComponentRef = createRef();
  const [args, setArgs] = useState(null);
  const [showAddEventForm, setshowAddEventForm] = useState(false);

  const [editEvent, setEditEvent] = useState(null);

  const [isEventClick, setIsEventClick] = useState(false);
  const [calendarWeekends] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([
    { id: shortid.generate(), 
      title: "Default event", 
      start: new Date().toISOString(),
    }
  ])

  const toggleAddEventForm = () => {
    setshowAddEventForm(!showAddEventForm);
  }

  const createEvent = (eventTitle, eventTime, eventColor, eventDate) => {
    toggleAddEventForm();
    setCalendarEvents([
      ...calendarEvents,
      {
        id: shortid.generate(),
        title: eventTitle,
        start: args.date.toISOString()
        .replace(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/, eventTime)
        .replace(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, eventDate),
        color: eventColor
      }
    ])
  }

  const doNotCreateEvent = () => {
    toggleAddEventForm();
    setArgs(null);
    setEditEvent(null);
    setIsEventClick(false);
  }

  const handleDateClick = arg => {
    toggleAddEventForm();
    setEditEvent(null);
    setIsEventClick(false);
    setArgs(arg);
  };

  const eventDrop = (info) => {
    calendarEvents.find(e => {
      if(e.id === info.event.id) {
        e.start = info.event.start
      } 
    })
  }

  const eventClick = (info) => {
    calendarEvents.find(e => {
      if(e.id === info.event.id) { 
        setEditEvent(e);
      } 
    })
    toggleAddEventForm();
    setIsEventClick(true);
  }

  const discardEvent = (id) => {
    Alert.fire(`I didn't find in FullCalendar documentation how to delete event in React, Event id - ${id}`);
  }

  return (
    <>
    <AddEventForm 
      doNotCreateEvent={doNotCreateEvent} 
      showAddEventForm={showAddEventForm} 
      createEvent={createEvent}
      isEventClick={isEventClick}
      editEvent={editEvent}
      discardEvent={discardEvent}
    />
    <div className="calendar">
      <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            editable={true}
            eventDrop={eventDrop}
            eventClick={eventClick}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={calendarComponentRef}
            weekends={calendarWeekends}
            events={calendarEvents}
            eventTextColor="#fff"
            dateClick={handleDateClick}
            timeFormat='H(:mm)'
          />
    </div>
    </>
  )
}

export default App;
