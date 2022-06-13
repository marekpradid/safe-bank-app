import React, {FC, useEffect, useRef} from 'react';
import './LoginPinNumbersPanel.scss';

interface LoginPinNumbersPanelProps {
    toMainPanel: () => void;
    pin: string
}

const LoginPinNumbersPanel: FC<LoginPinNumbersPanelProps> = (props) => {
    let {toMainPanel, pin} = {...props};

    const divRef1 = useRef<null | HTMLDivElement>(null);
    const divRef2 = useRef<null | HTMLDivElement>(null);
    const divRef3 = useRef<null | HTMLDivElement>(null);
    const divRef4 = useRef<null | HTMLDivElement>(null);
    const divRef5 = useRef<null | HTMLDivElement>(null);

    const divRefs = [divRef1, divRef2, divRef3, divRef4, divRef5];


    useEffect(() => {
        enterPressedPinNumbers(pin);
    }, [pin]);

    const enterPressedPinNumbers = (pinString: string) => {
        if (pinString.length === 0) {
            let div = divRefs[0].current as HTMLDivElement;
            div.innerHTML = '';

            return;
        }

        for (let i = 0; i < divRefs.length; i++) {
            if (i <= (pinString.length - 1)) {
                let div: HTMLDivElement = divRefs[i].current as HTMLDivElement;
                div.innerHTML = '*';
            } else {
                let div: HTMLDivElement = divRefs[i].current as HTMLDivElement;
                div.innerHTML = '';
            }
        }

        if (pinString.length === 5) {
            toMainPanel();
        }
    }

    return (
        <div className="loginPinNumbersContainer">
            <div ref={divRef1} className="pinNumber"/>
            <div ref={divRef2} className="pinNumber"/>
            <div ref={divRef3} className="pinNumber"></div>
            <div ref={divRef4} className="pinNumber"></div>
            <div ref={divRef5} className="pinNumber"></div>
        </div>
    )
};

export default LoginPinNumbersPanel;
