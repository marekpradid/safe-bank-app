import React, {ChangeEvent, ChangeEventHandler, FC, MouseEventHandler, useState} from 'react';
import './ForgotPasswordPage.scss';
import {useNavigate} from "react-router-dom";

interface ForgotPasswordPageProps {
}

const ForgotPasswordPage: FC<ForgotPasswordPageProps> = () => {

    const navigation = useNavigate();

    const [state, setState] = useState(
        {
            value: '',
            errors: {
                value: ''
            },
            loginStatus: '',
            submitted: false
        }
    );

    return (
        <div className="pageContainer">
            <div className="textPanel">
                <p className="font-weight-normal">Forgot your password?</p>
            </div>
            <div className="emailAddressPanel">
                <label htmlFor="email">Email address</label>
                <input type="email" className="emailInput" name="email" id="email"/>
                {state.submitted && state.errors.value.length > 0 && <span className='error'>{state.errors.value}</span>}
                <button type="submit" className="btn btn-primary btn-lg submitButton" onClick={() => navigation("/")}>Submit</button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
