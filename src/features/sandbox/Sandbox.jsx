import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Button} from "semantic-ui-react";
import {increment, decrement} from "./testReducer";
import {openModal} from "../../app/common/modals/modalReducer";

const Sandbox = props => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.test.data)
    const {loading} = useSelector(state => state.async)

    const [target, setTarget] = useState(null)

    return (
        <>
            <h1>Testing 123</h1>
            <h3>The data is: {data}</h3>
            <Button
                loading={loading && target === 'increment'}
                name="increment"
                content="increment"
                color="green"
                onClick={(e) => {
                    dispatch(increment(20))
                    setTarget(e.target.name)
                }}
            />
            <Button
                loading={loading && target === 'decrement'}
                name="decrement"
                content="decrement"
                color="red"
                onClick={(e) => {
                    dispatch(decrement(10))
                    setTarget(e.target.name)
                }}
            />
            <Button
                content="Open Model"
                color="teal"
                onClick={() => dispatch(openModal({
                    modalType: 'TestModal',
                    modalProps: {data}
                }))}
            />
        </>
    );
};

export default Sandbox;
