import React, {FC, useState} from 'react';
import './LoginPage.scss';
import {useNavigate} from "react-router-dom";
import LoginPinNumbersPanel from "../../widgets/login/LoginPinNumbersPanel/LoginPinNumbersPanel";
import LoginNumbersPanel from "../../widgets/login/LoginNumbersPanel/LoginNumbersPanel";
import {useAppDispatch} from "../../../@hooks/hooksIndex";
import * as actions from '../../../store/actions/actions';

interface LoginPageProps {
}

const LoginPage: FC<LoginPageProps> = () => {
    const [email, setEmail] = useState(
        {
            emailValue: '',
            errors: ''
        }
    );
    const [pin, setPin] = useState("");

    let navigate = useNavigate()
    const dispatch = useAppDispatch();

    const toMainPanel = () => {
        if (!validate()) {
            return
        }
        const loginData = {
            email: email.emailValue,
            password: pin
        };

        dispatch(actions.login(loginData)).then(
            result => navigate("/panel")
        );
    }

    const validate = () => {
        if (email.emailValue.length === 0) {
            setEmail({
                emailValue: email.emailValue,
                errors: 'Enter email address'
            });
            return false;
        }
        if (email.emailValue.indexOf("@") == -1) {
            setEmail({
                emailValue: email.emailValue,
                errors: 'Enter email address correct format'
            });
            return false;
        }

        setEmail({
            emailValue: email.emailValue,
            errors: ''
        });
        return true;
    }

    const toLogoPage = () => {
        navigate("/");
    }

    const fillPressedPinNumber = (pinNumber: string): void => {
        setPin(pin + pinNumber);
    }

    const deletePressedPinNumber = (): void => {
        setPin(pin.substring(0, pin.length - 1));
    }

    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        let {value} = e.target;
        setEmail({
            emailValue: value,
            errors: ''
        });
    }

    return (
        <div className="loginPageContainer">
            <div className="loginTextPanel">
                <p className="font-weight-normal">Enter your E-mail and PIN</p>
            </div>
            <div className="emailAddressPanelLogin">
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={email.emailValue} className="emailInput" name="email" id="email"
                           onChange={(e) => onEmailChange(e)}/>

                </div>
                {email.errors.length > 0 && <span className='error'>{email.errors}</span>}
            </div>
            <LoginPinNumbersPanel toMainPanel={toMainPanel} pin={pin}/>
            <LoginNumbersPanel toLogoPage={toLogoPage} fillPressedPinNumber={fillPressedPinNumber}
                               deletePressedPinNumber={deletePressedPinNumber}/>
        </div>
    );
};

export default LoginPage;
