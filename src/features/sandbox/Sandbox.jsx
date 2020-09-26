import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { increment, decrement } from "./testReducer";

const Sandbox = props => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.test.data)

    return (
        <>
<h1>Testing 123</h1>
            <h3>The data is: {data}</h3>
            <Button content="increment" color="green" onClick={() => dispatch(increment(20)) } />
            <Button content="decrement" color="red" onClick={ () => dispatch(decrement(10)) } />
        </>
    );
};

export default Sandbox;
