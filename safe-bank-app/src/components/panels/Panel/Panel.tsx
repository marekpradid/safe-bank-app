import React, {FC, useEffect} from 'react';
import './Panel.scss';
import {Outlet, useNavigate} from "react-router-dom";
import Navigation from "../../widgets/panels/Navigation/Navigation";
import {isValidToken} from "../../../tools/tools";
import {useAppDispatch, useAppSelector} from "../../../@hooks/hooksIndex";
import Loader from "../../UI/Loader";
import * as actions from '../../../store/actions/actions';

interface MainPanelProps {
}

const Panel: FC<MainPanelProps> = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const initialDataStatus = useAppSelector((state) => state.panel.initialDataStatus);

    const setAuthStatus = (status: boolean) => dispatch(actions.setAuthStatus(status));
    const fetchInitialData = () => dispatch(actions.fetchInitialData());
    const clearInitialData = () => dispatch(actions.clearInitialData());

    const checkValidToken = async () => {
        try {
            await isValidToken();

            setAuthStatus(true);
            fetchInitialData();
        } catch (err) {
            setAuthStatus(false);
            clearInitialData().then(result => navigation("/"));
        }
    };
    useEffect(() => {
        checkValidToken();
    }, []);

    if (!initialDataStatus) {
        return <Loader />;
    }

    return (
        <div className="panel">
            <Navigation/>
            <main className="mainPanel">
                <Outlet />
            </main>
        </div>
    )
};

export default Panel;
