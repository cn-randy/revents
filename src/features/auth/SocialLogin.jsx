import React from 'react';
import {Button} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../app/common/modals/modalReducer";
import {socialLogin} from "../../app/firestore/firebaseService";

const SocialLogin = () => {
    const dispatch = useDispatch()

    const handleSocialLogin = (provider) => {
        dispatch(closeModal())
        socialLogin(provider)
    }
    return (
        <React.Fragment>
            <Button
                icon="facebook"
                fluid
                color="facebook"
                style={{marginBottom: 10}}
                content="Login with Facebook"
                onClick={() => handleSocialLogin('facebook')}
            />

            <Button
                icon="google"
                fluid
                color="google plus"
                content="Login with Google"
                onClick={() => handleSocialLogin('google')}
            />
        </React.Fragment>
    );
};

export default SocialLogin;