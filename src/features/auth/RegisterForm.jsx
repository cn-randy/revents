import React from 'react';
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import {Button, Divider, Label} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../app/common/modals/modalReducer";
import {registerInFirebase} from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <ModalWrapper size="mini" header={"Register to Re-vents"}>
                <Formik
                    initialValues={{displayName: '', email: '', password: ''}}
                    validationSchema={Yup.object({
                        displayName: Yup.string().required(),
                        email: Yup.string().required().email(),
                        password: Yup.string().required().min(7)
                    })}
                    onSubmit={ async (values, {setSubmitting, setErrors}) => {
                        try {
                            await registerInFirebase(values)
                            dispatch(closeModal())
                        } catch (error) {
                            setErrors({auth: error.message})
                            setSubmitting(false)
                        }
                    }}
                >
                    {({isSubmitting, isValid, dirty, errors}) => (
                        <Form className="ui form">
                            <MyTextInput name="displayName" placeholder="Display Name"/>
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
                                content="Register"
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

export default RegisterForm;