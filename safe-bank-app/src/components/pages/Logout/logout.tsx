import React, { useEffect } from 'react';

import * as H from 'history';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../@hooks/hooksIndex";
import * as actions from "../../../store/actions/actions";
import {clearInitialData} from "../../../store/actions/actions";

type Props = {
   // history: H.History;
};

const Logout: React.FC<Props> = (props) => {
   const navigation = useNavigate();
   const dispatch = useAppDispatch();

   const clearInitialData = () => dispatch(actions.clearInitialData());

   useEffect(() => {
      localStorage.removeItem('token');
      clearInitialData();
      navigation("/");
   }, []);

   return null;
};

export default Logout;
