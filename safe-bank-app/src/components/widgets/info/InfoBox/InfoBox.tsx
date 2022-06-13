import React, {FC} from 'react';
import './InfoBox.scss';

interface InfoBoxProps {
    infoBoxTitle?: string,
    infoBoxText: string,
    infoBoxValue: string
}

const InfoBox: FC<InfoBoxProps> = (props) => (
    <div className="infoBox">
        {props.infoBoxTitle ? <div className="infoBoxTitle">{props.infoBoxTitle}</div> : null}
        <div className="infoBoxSpanPanel">
            <div className="telephoneIcon"/>
            <div className="infoBoxText">{props.infoBoxText}</div>
            <div className="infoBoxValue">{props.infoBoxValue}</div>
        </div>
    </div>
);

export default InfoBox;
