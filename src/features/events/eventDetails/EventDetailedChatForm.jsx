import React from 'react';
import {Field, Formik, Form} from 'formik'
import {Loader} from "semantic-ui-react";
import {toast} from "react-toastify";
import * as Yup from 'yup'
import {addEventChatComment} from "../../../app/firestore/firebaseService";

const EventDetailedChatForm = ({eventId, parentId, closeForm}) => {
    return (
        <Formik
            initialValues={{comment: ''}}
            validationSchema={Yup.object({
                comment: Yup.string().required()
            })}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                console.log('onSubmit')
                try {
                    await addEventChatComment(eventId, {...values, parentId})
                    resetForm()
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setSubmitting(false)
                    closeForm({open: false, commentId: null})
                }
            }}
        >
            {({isSubmitting, handleSubmit, isValid, dirty}) => (
                <Form className="ui form">
                    <Field name="comment">
                        {({field}) => (
                            <div style={{position: 'relative'}}>
                                <Loader active={isSubmitting} />
                                <textarea
                                    rows="2"
                                    {...field}
                                    placeholder="Enter your comment (enter to submit, SHIFT enter for new line)"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && e.shiftKey) {
                                            return
                                        }
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            isValid && handleSubmit()
                                        }
                                    }}
                                ></textarea>
                            </div>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
};

export default EventDetailedChatForm;