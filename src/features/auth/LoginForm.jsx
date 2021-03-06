import React from 'react';
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import {Button, Divider, Label} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../app/common/modals/modalReducer";
import {signinWithEmail} from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <ModalWrapper size="mini" header={"Sign in to Re-vents"}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={Yup.object({
                        email: Yup.string().required().email(),
                        password: Yup.string().required().min(7)
                    })}
                    onSubmit={ async (values, {setSubmitting, setErrors}) => {
                        try {
                            await signinWithEmail(values)
                            setSubmitting(false)
                            dispatch(closeModal())
                        } catch (error) {
                            setErrors({auth: 'There is a problem with your login.'})
                            setSubmitting(false)
                        }
                    }}
                >
                    {({isSubmitting, isValid, dirty, errors}) => (
                        <Form className="ui form">
                            <MyTextInput name="email" placeholder="Email Address"/>
                            <MyTextInput name="password" placeholder="Password" type="password"/>
                            {errors.auth && <Label basic color="red" style={{marginBottom: 10}} content={errors.auth} />}
                            <Button
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type="submit"
                                fluid
                                size="large"
                                color="teal"
                                content="Login"
                            />

                            <Divider horizontal>Or</Divider>
                            <SocialLogin />
                        </Form>
                    )}
                </Formik>
            </ModalWrapper>
        </div>
    );
};

export default LoginForm;