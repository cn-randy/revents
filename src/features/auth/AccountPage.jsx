import React from 'react';
import {Button, Header, Label, Segment} from "semantic-ui-react";
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {updateUserPassword} from '../../app/firestore/firebaseService'

const AccountPage = () => {
    const {currentUser} = useSelector(state => state.auth)
    return (
        <Segment>
            <Header dividing size="large" content="Account"/>
            {currentUser.providerId === 'password' &&
            <React.Fragment>
                <Header color="teal" sub content="Change Password"/>
                <p>Use this form to change your password.</p>
                <Formik
                    initialValues={{newPassword1: '', newPassword2: ''}}
                    validationSchema={Yup.object({
                        newPassword1: Yup.string().required('Password is required.'),
                        newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], 'Passwords do not match.'),
                    })}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        try {
                            await updateUserPassword(values)
                        } catch (error) {
                            setErrors({auth: error.message})
                        } finally {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({errors, isSubmitting, isValid, dirty}) => (
                        <Form className="ui form">
                            <MyTextInput name="newPassword1" type="password" placeholder="New Password"/>
                            <MyTextInput name="newPassword2" type="password" placeholder="Confirm Password"/>
                            {errors.auth && <Label basic color="red" style={{marginBottom: 10}} content={errors.auth}/>}
                            <Button
                                type="submit"
                                style={{display: 'block'}}
                                loading={isSubmitting}
                                disabled={!isValid || isSubmitting || !dirty}
                                size="large"
                                positive
                                content="Update password"
                            />
                        </Form>
                    )}
                </Formik>
            </React.Fragment>
            }

            {currentUser.providerId === 'facebook.com' &&
            <React.Fragment>
                <Header color="teal" sub content="Facebook account"/>
                <p>Please visit facebook to update your account</p>
                <Button icon="facebook" color="facebook" as={Link} to="https://facebook.com" content="Go to Facebook"/>
            </React.Fragment>
            }

            {currentUser.providerId === 'google.com' &&
            <React.Fragment>
                <Header color="teal" sub content="Google account"/>
                <p>Please visit gppglr to update your account</p>
                <Button icon="googlr" color="google plus" as={Link} to="https://goodle.com" content="Go to Google"/>
            </React.Fragment>
            }
        </Segment>
    );
};

export default AccountPage;