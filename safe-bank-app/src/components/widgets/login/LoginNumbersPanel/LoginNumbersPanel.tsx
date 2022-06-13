import React, {FC} from 'react';
import './LoginNumbersPanel.scss';

interface LoginNumbersPanelProps {
    toLogoPage: () => void;
    fillPressedPinNumber: (pinNumber: string) => void;
    deletePressedPinNumber: () => void;
}

const LoginNumbersPanel: FC<LoginNumbersPanelProps> = (props) => {


    return (
        <div className="loginNumbersPanel">
            <div className="d-flex justify-content-around">
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('1')}>1</div>
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('2')}>2</div>
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('3')}>3</div>
            </div>
            <div className="d-flex justify-content-around">
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('4')}>4</div>
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('5')}>5</div>
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('6')}>6</div>
            </div>
            <div className="d-flex justify-content-around">
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('7')}>7</div>
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('8')}>8</div>
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('9')}>9</div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="p-2 flexItemCancel" onClick={props.toLogoPage}>Cancel</div>
                <div className="p-2 flexItem" onClick={e => props.fillPressedPinNumber('0')}>0</div>
                <div className="p-2 flexItemClear" onClick={e => props.deletePressedPinNumber()} />
            </div>
        </div>
    );
};

export default LoginNumbersPanel;
