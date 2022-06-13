import * as actionTypes from './actionTypes';
import {AppDispatch} from "../store";
import getUserInitialData from "../../tools/getUserInitialData";

export const setAuthStatus = (status: string, email = null) => ({
   type: actionTypes.SET_AUTH_STATUS,
   status,
   email,
});

export const fetchInitialData = () => async (dispatch: AppDispatch) => {
   try {
      const data = await getUserInitialData();

      if (!data) {
         dispatch(initialDataStatus(false));
         return;
      }

      dispatch({ type: actionTypes.FETCH_PROFILE, data: data.user });
      dispatch({ type: actionTypes.FETCH_ACCOUNTS, data: data.accounts });
      dispatch({ type: actionTypes.FETCH_TRANSFERS, data: data.transfers });
      dispatch({ type: actionTypes.FETCH_CARDS, data: data.cards });
      dispatch({ type: actionTypes.FETCH_MESSAGES, data: data.messages });
      dispatch(initialDataStatus(true));
   } catch (err) {
      dispatch(initialDataStatus(false));
   }
};

export const clearInitialData = () => async (dispatch: AppDispatch) => {
   try {
      dispatch({ type: actionTypes.CLEAR_PROFILE});
      dispatch({ type: actionTypes.CLEAR_ACCOUNTS});
      dispatch({ type: actionTypes.CLEAR_TRANSFERS});
      dispatch({ type: actionTypes.CLEAR_CARDS});
      dispatch({ type: actionTypes.CLEAR_MESSAGES});
      dispatch(clearDataStatus(true));
   } catch (err) {
      dispatch(clearDataStatus(false));
   }
};

export const clearDataStatus = (status: boolean) => ({
   type: actionTypes.CLEAR_INITIAL_DATA_STATUS,
   status,
});

export const initialDataStatus = (status: boolean) => ({
   type: actionTypes.FETCH_INITIAL_DATA_STATUS,
   status,
});
