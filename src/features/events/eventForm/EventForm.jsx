import React from "react";
import {Segment, Header, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Formik, Form} from 'formik'
import cuid from 'cuid'
import * as Yup from 'yup'

import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";

import MySelectInput from '../../../app/common/form/MySelectInput'
import {createEvent, updateEvent} from "../eventActions";
import {categoryData} from "../../../app/api/categoryOptions";

export default function EventForm({match, history}) {
    const dispatch = useDispatch()
    const selectedEvent = useSelector(state => state.event.events.find(evt => evt.id === match.params.id))

    const initialValues = selectedEvent || {
        title: "",
        category: "",
        description: "",
        city: "",
        venue: "",
        date: "",
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("You must provide a title"), // override default error message
        category: Yup.string().required("You must provide a category"),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required(),
    })

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    selectedEvent
                        ? dispatch(updateEvent({...selectedEvent, ...values}))
                        : dispatch(createEvent({
                            ...values,
                            id: cuid(),
                            hostedBy: "Fred",
                            attendees: [],
                            hostPhotoURL: "/assets/user.png",
                        }));

                    history.push('/events')
                }}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <Form className="ui form">
                        <Header sub color="teal" content="Event Details" />
                        <MyTextInput name="title" placeholder="Event Title" />
                        <MySelectInput name="category" placeholder="Event Category" options={categoryData} />
                        <MyTextArea name="description" placeholder="Event Description" rows={3} />
                        <Header sub color="teal" content="Event Location" />
                        <MyTextInput name="city" placeholder="Event City" />
                        <MyTextInput name="venue" placeholder="Event Venue" />
                        <MyDateInput name="date" placeholderText="Event Date" timeFormat="HH:mm" showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm a " />

                        <Button
                            type='Submit'
                            loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting}
                            floated='right'
                            positive
                            content='Submit'
                        />

                        <Button
                            as={Link}
                            to="/events"
                            type='Submit'
                            disabled={isSubmitting}
                            floated='right'
                            content='Cancel'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
}
