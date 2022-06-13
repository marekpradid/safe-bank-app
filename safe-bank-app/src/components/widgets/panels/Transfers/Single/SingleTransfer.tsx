import React from 'react';
import {useAppSelector} from "../../../../../@hooks/hooksIndex";
import {formatDate} from "../../../../../tools/tools";
import {useParams} from "react-router-dom";


interface Params {
   transId: string;
}

interface Props {}

const SingleTransfer: React.FC<Props> = (props) => {
   const params = useParams();
   const transId = params.transId;
   const singleTrans = useAppSelector((state) =>
      state.transfers.data.find((el) => el._id === transId)
   );

   const { type, payeeName, amount, status } = singleTrans;
   const date = formatDate(singleTrans.date, 'dd/MM/yyyy HH:mm');

   return (
      <section className="module single-transfer">
         <h1>{type}</h1>
         <ul>
            <li>Date: {date}</li>
            <li>Payee: {payeeName}</li>
            <li>Amount: {amount}</li>
            <li>Type: {type}</li>
            <li>Status: {status}</li>
         </ul>
      </section>
   );
};

export default SingleTransfer;
