import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import './App.scss';
import LogoPage from "../pages/LogoPage/LogoPage";
import PageNotFound from "../pages/PageNotFound";
import LoginPage from "../pages/LoginPage/LoginPage";
import Panel from "../panels/Panel/Panel";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import InfoPage from "../pages/InfoPage/InfoPage";
import PanelIntro from "../widgets/panels/PanelIntro/PanelIntro";
import AccountsList from "../widgets/panels/Accounts/List/AccountsList";
import SingleAccount from "../widgets/panels/Accounts/Single/Single";
import Logout from "../pages/Logout/logout";
import {useAppDispatch} from "../../@hooks/hooksIndex";
import * as actions from '../../store/actions/actions';
import {isValidToken} from "../../tools/tools";
import {updateAPIConfig} from "../../api/base";
import TransfersList from "../widgets/panels/Transfers/List/TransfersList";
import NewTransfer from "../widgets/panels/Transfers/New/NewTransfer";
import SingleTransfer from "../widgets/panels/Transfers/Single/SingleTransfer";
import CardsList from "../widgets/panels/Cards/List/CardsList";
import SingleCard from "../widgets/panels/Cards/Single/SingleCard";
import MessagesList from "../widgets/panels/Messages/List/MessagesList";
import SingleMessage from "../widgets/panels/Messages/Single/SingleMessage";
import Profile from "../widgets/panels/Profile/Profile";
import Help from "../widgets/panels/Help/Help";

const App: React.FC = () => {

    const dispatch = useAppDispatch();

    const setAuthStatus = (status: boolean) => dispatch(actions.setAuthStatus(status));

    const navigation = useNavigate();

    const clearInitialData = () => dispatch(actions.clearInitialData());

    useEffect(() => {
        isValidToken()
            .then((token) => {
                updateAPIConfig({ authToken: token });
                setAuthStatus(true);
                navigation("/panel");
            })
            .catch(() => {
                setAuthStatus(false);
                clearInitialData().then(result => navigation("/"));
            });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<LogoPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/password" element={<ForgotPasswordPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/info" element={<InfoPage/>}/>

            <Route path="/panel" element={<Panel/>}>
                <Route path="/panel" element={<PanelIntro />} />
                <Route path="/panel/accounts" element={<AccountsList />} >
                    <Route path="/panel/accounts/:accId" element={<SingleAccount />} />
                </Route>
                <Route path="/panel/transfers" element={<TransfersList />} >
                    <Route path="/panel/transfers/:transId" element={<SingleTransfer />} />
                </Route>
                <Route path="/panel/cards" element={<CardsList />} >
                    <Route path="/panel/cards/:cardId" element={<SingleCard />} />
                </Route>
                <Route path="/panel/profile" element={<Profile/>} />
                <Route path="/panel/messages" element={<MessagesList />} >
                    <Route path="/panel/messages/:messageId" element={<SingleMessage />} />
                </Route>
                <Route path="/panel/help" element={<Help />} />
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
            <Route path="/newPanel" element={<NewTransfer />} />

            <Route path="/logout" element={<Logout />}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );
}

export default App;
