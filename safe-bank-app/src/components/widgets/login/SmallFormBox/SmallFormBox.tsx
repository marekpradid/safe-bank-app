import React, { FC } from 'react';
import loginIcon from './login-icon.png';

interface SmallFormBoxProps {}

const SmallFormBox: FC<SmallFormBoxProps> = (props) => (
    <section className="module small-form-module">
        <section className="login-icon">
            <div className="icon-container">
                <img src={loginIcon} className="img-responsive" alt="Login icon" />
            </div>
        </section>

        {props.children}
    </section>
);

export default SmallFormBox;
