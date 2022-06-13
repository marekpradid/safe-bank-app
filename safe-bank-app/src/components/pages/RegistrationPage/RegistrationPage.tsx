import React, {ChangeEvent, FC, useState} from 'react';
import './RegistrationPage.scss';
import InputRange from "../../widgets/registration/InputRange/InputRange";
import countryData from './data.json';

interface RegistrationPageProps {
}

const RegistrationPage: FC<RegistrationPageProps> = () => {
    const [state, setState] = useState(
        {
            user: {
                firstName: '',
                lastName: '',
                dateOfBirth: 'dd-MM-YYYY',
                age: 38,
                email: '',
                phone: '',
                country: 'SK',
                address: {
                    town: '',
                    street: '',
                    houseNumber: '',
                    postalCode: ''
                },
                shippingAddress: {
                    shipTown: '',
                    shipStreet: '',
                    shipHouseNumber: '',
                    shipPostalCode: ''
                },
                subscribenewsletter: false
            },
            errors: {
                user: {
                    nameError: 'Enter First Name and Last name',
                    emailError: 'Enter email address',
                    phoneError: 'Enter phone number',
                    dateOfBirthError: 'Enter date of birth',
                    countryError: 'Enter country',
                    addressError: 'Enter address'
                }
            },
            submitted: false
        }
    );

    function inputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        let newState: any;

        if(name === 'subscribenewsletter'){
            newState = clone(state, name, event.target.checked);
        }else{
            newState = clone(state, name, value);
        }

        setState(newState);
    }

    function inputChangeSelectElement(event: ChangeEvent<HTMLSelectElement>) {
        const {name, value} = event.target;

        const newState = clone(state, name, value);

        setState(newState);
    }

    function clone(objectToClone: any, name: string, value: any): any {
        let cloneObj: any = {};
        for (var attribut in objectToClone) {
            if (typeof objectToClone[attribut] === "object") {
                cloneObj[attribut] = clone(objectToClone[attribut], name, value);
            } else {
                if (attribut === name) {
                    cloneObj[attribut] = value;
                } else {
                    cloneObj[attribut] = objectToClone[attribut];
                }
            }
        }
        return cloneObj;
    }

    function onChangeInputRange(value: any) {
        const newState = clone(state, 'age', value);
        setState(newState);
    }

    function render() {
        const {firstName, lastName, dateOfBirth, age, email, phone, country, subscribenewsletter} = state.user;
        const {town, street, houseNumber, postalCode} = state.user.address;
        const {shipTown, shipStreet, shipHouseNumber, shipPostalCode} = state.user.shippingAddress;
        const {submitted} = state;

        return (
            <div className="registrationPageContainer">
                <div className="regTextPanel">
                    <p className="font-weight-normal">User Registration</p>
                </div>
                <div className="row">
                    <label className="col-sm-2">Name</label>
                    <div className="col-sm-3 mb-2 firstDiv">
                        <input type="text" value={firstName} name="firstName" className="form-control"
                               placeholder="First Name"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                        {submitted && state.errors.user.nameError.length > 0 &&
                            <span className='error'>{state.errors.user.nameError}</span>}
                    </div>
                    <div className="col-sm-3 mb-2 secondDiv">
                        <input type="text" value={lastName} name="lastName" className="form-control"
                               placeholder="Last Name"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="dateOfBirth" className="col-sm-2 col-form-label">Birth date</label>
                    <div className="col-sm-6 mb-2 rowDiv">
                        <input type="date" value={dateOfBirth} name="dateOfBirth" onChange={(e) => {
                            inputChange(e)
                        }} className="form-control" id="dateOfBirth"/>
                        {submitted && state.errors.user.dateOfBirthError.length > 0 &&
                            <span className='error'>{state.errors.user.dateOfBirthError}</span>}
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="formControlAgeRange" className="col-sm-2">Age</label>
                    <div className="col-sm-6 mb-2 rowDiv">
                        <InputRange min={18} max={100} step={1} value={age} onChangeInputRange={onChangeInputRange}/>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="email" className="col-sm-2">Email</label>
                    <div className="col-sm-6 mb-2 rowDiv">
                        <input type="email" value={email} name="email" onChange={(e) => {
                            inputChange(e)
                        }} className="form-control" id="email" placeholder="jozko.merkvicka@gmail.com"/>
                        {submitted && state.errors.user.emailError.length > 0 &&
                            <span className='error'>{state.errors.user.emailError}</span>}
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-6 mb-2 rowDiv">
                        <input type="text" pattern="[0-9]" maxLength={16} value={phone} name="phone"
                               onChange={(e) => {
                                   inputChange(e)
                               }} className="form-control" id="phone" placeholder="(+421) 904 123 123"/>
                        {submitted && state.errors.user.phoneError.length > 0 &&
                            <span className='error'>{state.errors.user.phoneError}</span>}
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="country" className="col-sm-2 col-form-label">Country</label>
                    <div className="col-sm-6 mb-2 rowDiv">
                        <select className="custom-select " value={country} name="country" id="inlineFormCustomSelect"
                                onChange={(e) => inputChangeSelectElement(e)}>
                            {
                                countryData.map((country, index) => {
                                    return (
                                        <option key={index} value={country.value}>{country.label}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-2">Address</label>
                    <div className="col-sm-3 mb-2 firstDiv">
                        <input type="text" value={town} name="town" className="form-control"
                               placeholder="Town"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                        {submitted && state.errors.user.addressError.length > 0 &&
                            <span className='error'>{state.errors.user.addressError}</span>}
                    </div>
                    <div className="col-sm-3 mb-2 secondDiv">
                        <input type="text" value={street} name="street" className="form-control"
                               placeholder="Street"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                </div>
                <div className="row">
                    {/* fake empty label*/}
                    <label className="col-sm-2"></label>
                    <div className="col-sm-3 mb-2 firstDiv">
                        <input type="text" value={houseNumber} name="houseNumber" className="form-control"
                               placeholder="House Number"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                    <div className="col-sm-3 mb-2 secondDiv">
                        <input type="text" value={postalCode} name="postalCode" className="form-control"
                               placeholder="Postal Code"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-2">Shipping Address</label>
                    <div className="col-sm-3 mb-2 firstDiv">
                        <input type="text" value={shipTown} name="shipTown" className="form-control"
                               placeholder="Town"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                    <div className="col-sm-3 mb-2 secondDiv">
                        <input type="text" value={shipStreet} name="shipStreet" className="form-control"
                               placeholder="Street"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                </div>
                <div className="row">
                    {/* fake empty label*/}
                    <label className="col-sm-2"></label>
                    <div className="col-sm-3 mb-2 firstDiv">
                        <input type="text" value={shipHouseNumber} name="shipHouseNumber" className="form-control"
                               placeholder="House Number"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                    <div className="col-sm-3 mb-2 secondDiv">
                        <input type="text" value={shipPostalCode} name="shipPostalCode" className="form-control"
                               placeholder="Postal Code"
                               onChange={(e) => {
                                   inputChange(e)
                               }}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 mb-2 rowDiv">
                        <label className="subscribeLabel" htmlFor="subscribenewsletter">
                            <input type="checkbox" className="subscribeInput" checked={subscribenewsletter} name="subscribenewsletter"
                                   onChange={(e) => inputChange(e)} id="subscribenewsletter" />Subscribe to the news letter</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 rowDiv">
                        <button type="button" className="submitRegButton" onClick={() => {}}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }

    return render();
};

export default RegistrationPage;
