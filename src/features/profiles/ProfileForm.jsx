import React from 'react';
import {Form, Formik} from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import {Button} from "semantic-ui-react";
import * as Yup from 'yup'
import {toast} from "react-toastify";
import {updateUserProfile} from "../../app/firestore/firestoreStervice";

const ProfileForm = ({profile}) => {
    const initialValues = {
        displayName: profile.displayName,
        description: profile.description || ''
    }

    const validationSchema = Yup.object({
        displayName: Yup.string().required()
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, setSubmitting) => {
                try {
                    await updateUserProfile(values)
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setSubmitting(false)
                }
            }}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className="ui form">
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <MyTextArea name="description" placeholder="Description" />
                    <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting || !isValid || !dirty}
                        floated="right"
                        size="large"
                        positive
                        content="Update profile"
                    />
                </Form>
            )}
        </Formik>
    );
};

export default ProfileForm;