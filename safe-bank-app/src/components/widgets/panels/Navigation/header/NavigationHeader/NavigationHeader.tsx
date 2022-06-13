import React, {FC} from 'react';
import './NavigationHeader.scss';
import {Link} from "react-router-dom";

type Props = {
    user: {
        firstName: string;
        lastName: string;
    };
    toggleMobileNav: () => void;
};

const NavigationHeader: FC<Props> = (props) => {
    return (
        <header className="navigation-header">
            <div className="user-profile-box">
                <Link to="/panel/profile">
                    <div className="navHeaderUserProfile"/>
                    <span>
                        {props.user.firstName} {props.user.lastName}
                    </span>
                </Link>
            </div>

            <ul className="navigation-header-links">
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
                <li className="toggle-menu">
                    <button onClick={props.toggleMobileNav}>
                        <i className="ion-navicon-round"/>
                    </button>
                </li>
            </ul>
        </header>
    );
};

export default NavigationHeader;
