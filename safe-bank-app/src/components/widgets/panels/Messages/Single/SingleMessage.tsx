import React from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector} from "../../../../../@hooks/hooksIndex";
import {formatDate} from "../../../../../tools/tools";


interface Params {
   messageId: string;
}

interface Props {}

type Message = {
   _id: string;
   title: string;
   sentDate: Date;
   content: string;
};

const SingleMessage: React.FC<Props> = (props) => {
    const params = useParams();
    const messageId = params.messageId;
   const singleMessage: Message = useAppSelector((state) =>
      state.messages.data.find((el) => el._id === messageId)
   );
   const sentDate = formatDate(singleMessage?.sentDate, 'dd/MM/yyyy HH:mm');

   return (
      <section className="module single-message">
         <h1>{singleMessage.title}</h1>
         <p>Date: {sentDate}</p>

         <hr />

         <article dangerouslySetInnerHTML={{ __html: singleMessage.content }} />
      </section>
   );
};

export default SingleMessage;
