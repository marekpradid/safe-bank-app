import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import './LogoPage.scss';
import IconsBox from "../../widgets/logo/IconsBox/IconsBox";

interface LogoPageProps {
}

const LogoPage: FC<LogoPageProps> = () => {
    let navigate = useNavigate()

    const toLoginPage = () => {
        navigate("/login");
    }

    return (
        <div className="logoPageContainer">
            <div className="logoPanel"/>
            <div className="loginButtonPanel">
                <button type="button"  className="btn btn-primary btn-lg loginButton" onClick={toLoginPage}>Login</button>
            </div>
            <IconsBox />
        </div>
    );
};

export default LogoPage;
