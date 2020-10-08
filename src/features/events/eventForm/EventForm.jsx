import React, {useState} from "react";
import {Segment, Header, Button, Confirm} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {toast} from 'react-toastify'

import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";

import MySelectInput from '../../../app/common/form/MySelectInput'
import {listenToEvents} from "../eventActions";
import {categoryData} from "../../../app/api/categoryOptions";
import {useFirestoreDoc} from "../../../app/hooks/useFirestoreDoc";
import {
    addEventToFirestore, cancelEventToggle,
    listenToEventFromFirestore,
    updateEventInFirestore
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function EventForm({match, history}) {
    const dispatch = useDispatch()
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)


    const selectedEvent = useSelector(state => state.event.events.find(evt => evt.id === match.params.id))
    const {loading, error} = useSelector(state => state.async)

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

    const handleCancelToggle = async (event) => {
        setConfirmOpen(false)
        setLoadingCancel(true)

        try {
            await cancelEventToggle(event)
            setLoadingCancel(false)
        } catch (error) {
            setLoadingCancel(true)
            toast.error(error.message)
        }
    }

    useFirestoreDoc({
        shouldExecute: !!match.params.id,
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        dependencies: [match.params.id, dispatch]
    })

    if (loading) {
        return <LoadingComponent content="Loading event..."/>
    }

    if (error) {
        return <Redirect to="/error"/>
    }

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        selectedEvent
                            ? await updateEventInFirestore(values)
                            : await addEventToFirestore(values)
                        setSubmitting = false
                        history.push('/events')

                    } catch (error) {
                        toast.error(error.message)
                        setSubmitting = false
                    }
                }}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <Form className="ui form">
                        <Header sub color="teal" content="Event Details"/>
                        <MyTextInput name="title" placeholder="Event Title"/>
                        <MySelectInput name="category" placeholder="Event Category" options={categoryData}/>
                        <MyTextArea name="description" placeholder="Event Description" rows={3}/>
                        <Header sub color="teal" content="Event Location"/>
                        <MyTextInput name="city" placeholder="Event City"/>
                        <MyTextInput name="venue" placeholder="Event Venue"/>
                        <MyDateInput name="date" placeholderText="Event Date" timeFormat="HH:mm" showTimeSelect
                                     timeCaption="time" dateFormat="MMMM d, yyyy h:mm a "/>

                        {selectedEvent && <Button
                            type='button'
                            loading={loadingCancel}
                            floated='left'
                            color={selectedEvent.isCancelled ? 'green' : 'red'}
                            content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel event'}
                            onClick={() => setConfirmOpen(true)}
                        />}

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

            <Confirm
                content={(selectedEvent?.isCancelled ? 'This will reactivate th event' : 'This will cancel the event') + ' - Are you sure'}
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => handleCancelToggle(selectedEvent)}
            />
        </Segment>
    );
}
