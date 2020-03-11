import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

import clock from './assets/clock.svg';
import colorPicker from './assets/color-picker.svg';
import name from './assets/name.svg';
import calendar from './assets/calendar.svg';

const EventEditForm = ({ doNotCreateEvent, showAddEventForm, createEvent, isEventClick, editEvent, discardEvent, moveEvent }) => {
	const { register, handleSubmit, errors, reset } = useForm();

	useEffect(() => {
		if(isEventClick) {
			setTimeout(() => {
				reset({
				  eventTitle: editEvent.title,
				  eventDate: editEvent.start.slice(0, 10),
				  eventTime: editEvent.start.slice(11, 19),
				  eventColor: editEvent.color
				});
			}, 800);
		} else {
			reset({
				eventTitle: "",
				eventDate: "",
				eventTime: "",
				eventColor: ""
			  });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEventClick, reset])

	const onSubmit = ({ eventTitle, eventTime, eventColor, eventDate }) => {
		createEvent(eventTitle, eventTime, eventColor, eventDate);
	};

	return (
		<Modal show={showAddEventForm} onHide={doNotCreateEvent}>
			<Modal.Header closeButton>
				{isEventClick ? <Modal.Title>EDIT EVENT FORM</Modal.Title> : <Modal.Title>ADD EVENT FORM</Modal.Title>}
			</Modal.Header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<InputGroup className="mb-3">
						<FormControl
							name="eventTitle"
							placeholder="name"
							ref={register({ required: true, maxLength: 30 })}
						/>
						<InputGroup.Append>
							<InputGroup.Text id="basic-addon2">
								<img src={name} width="20" height="20" alt="name-icon" />
							</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
					{errors.eventTitle && <span style={spanStyles}>NOT VALID</span>}
					<InputGroup className="mb-3">
						<FormControl
							name="eventDate"
							placeholder="yyyy-mm-dd"
							ref={register({
								required: true,
								pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
							})}
						/>
						<InputGroup.Append>
							<InputGroup.Text id="basic-addon2">
								<img src={calendar} width="20" height="20" alt="calendar-icon" />
							</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
					{errors.eventDate && <span style={spanStyles}>NOT VALID</span>}
					<InputGroup className="mb-3">
						<FormControl
							name="eventTime"
							placeholder="hh:mm:ss"
							ref={register({
								required: true,
								pattern: /^([01]?\d|2[0-3]|24(?=:00?:00?$)):([0-5]\d):([0-5]\d)$/m
							})}
						/>
						<InputGroup.Append>
							<InputGroup.Text id="basic-addon2">
								<img src={clock} width="20" height="20" alt="clock-icon" />
							</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
					{errors.eventTime && <span style={spanStyles}>NOT VALID</span>}
					<InputGroup className="mb-3">
						<FormControl
							name="eventColor"
							placeholder="#378006"
							ref={register({ pattern: /^#[0-9a-f]{3,6}$/i })}
						/>
						<InputGroup.Append>
							<InputGroup.Text id="basic-addon2">
								<img src={colorPicker} width="20" height="20" alt="color-picker-icon" />
							</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
					{errors.eventColor && <span style={spanStyles}>NOT VALID</span>}
				</Modal.Body>
				{isEventClick ? (
					<Modal.Footer style={modalFooterStyles}>
						<Button variant="danger" onClick={() => discardEvent(editEvent.id)}>DISCARD</Button>
						<Button variant="primary" type="sumbit">
							EDIT
						</Button>
					</Modal.Footer>
				) : (
					<Modal.Footer style={modalFooterStyles}>
						<Button variant="danger" onClick={doNotCreateEvent}>
							CLOSE
						</Button>
						<Button variant="primary" type="submit">
							SAVE
						</Button>
					</Modal.Footer>
				)}
			</form>
		</Modal>
	);
};

export default EventEditForm;

const modalFooterStyles = {
	display: 'flex',
	justifyContent: 'space-between'
};

const spanStyles = {
	color: 'red',
	marginBottom: '10px',
	display: 'inline-block'
};
