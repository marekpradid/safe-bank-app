import React from 'react';
import {Link, Outlet, useLocation, useParams} from 'react-router-dom';

import AccountsListEl from '../ListElement/ListElement';
import {useAppSelector} from "../../../../../@hooks/hooksIndex";

interface Props {
}

const AccountsList: React.FC<Props> = (props) => {
    const accounts = useAppSelector((state) => state.accounts.data);

    // Prepare accounts list
    const accountsList = accounts.map((acc) => (
        <AccountsListEl key={acc._id} {...acc} />
    ));

    return (
        <div>
            <h1>Accounts</h1>

            <p>You have {accountsList.length} accounts</p>
            <div className="list-group">{accountsList}</div>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default AccountsList;
