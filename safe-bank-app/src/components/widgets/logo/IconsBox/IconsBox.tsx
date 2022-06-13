import React, {FC} from 'react';
import './IconsBox.scss';
import {useNavigate} from "react-router-dom";

interface IconsBoxProps {
}

const IconsBox: FC<IconsBoxProps> = () => {
    const navigation = useNavigate();

    return (
        <div className="iconsPanel">
            <div className="passwordIcon" onClick={() => navigation("/password")}>
                <span className="passwordTooltipText">Forgot password</span>
            </div>
            <div className="registrationIcon" onClick={() => navigation("/registration")}>
                <span className="tooltipText">Registration</span>
            </div>
            <div className="informationIcon" onClick={() => navigation("/info")}>
                <span className="tooltipText">Information</span>
            </div>
        </div>
    );
};

export default IconsBox;
