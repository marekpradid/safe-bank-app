import React, {useRef, useState} from 'react';

import * as actions from '../../../../../store/actions/actions';
import MessagesListEl from '../ListElement/MessagesListEl';
import {useAppDispatch, useAppSelector} from "../../../../../@hooks/hooksIndex";
import {Outlet} from "react-router-dom";

interface Props{}

const MessagesList: React.FC<Props> = (props) => {
   const dispatch = useAppDispatch();

   const [search, setSearch] = useState('');

   const messages = useAppSelector((state) => state.messages.data);

   const messageToggle = (id: string) => dispatch(actions.messageToggle(id));
   const messageRemove = (id: string) => dispatch(actions.messageRemove(id));
   const findMessage = (value: string) => setSearch(value);

    const searchRef = useRef<HTMLInputElement>(null);

   // Messages
   // Allow search by message title
   const searchText = search.toLowerCase();
   const messagesList = messages
      .filter((message) => message.title.toLowerCase().includes(searchText))
      .map((message) => (
         <MessagesListEl
            key={message._id}
            {...message}
            onToggle={() => messageToggle(message._id)}
            onRemove={() => messageRemove(message._id)}
         />
      ));

   return (
      <div>
         <h1>Messages</h1>

         <p>There are {messages.length} messages in your box</p>

         <div className="form-group">
            <input
               className="form-control"
               placeholder="Search for..."
               onChange={(e) => findMessage(e.target.value)}
               ref={searchRef}
            />
         </div>

         <div className="list-group">{messagesList}</div>
          <main>
              <Outlet/>
          </main>
      </div>
   );
};

export default MessagesList;
