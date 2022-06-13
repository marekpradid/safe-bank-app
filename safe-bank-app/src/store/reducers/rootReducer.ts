import * as H from 'history';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './authReducer';
import accounts from './accountsReducer';
import panel from './panelReducer';
import cards from './cardsReducer';
import messages from './messagesReducer';
import profile from './profileReducer';
import transfers from './transfersReducer';

const getReducers = (history: H.History) =>
    combineReducers({
        router: connectRouter(history),
        auth,
        accounts,
        panel,
        cards,
        messages,
        profile,
        transfers
    });

export default getReducers;
