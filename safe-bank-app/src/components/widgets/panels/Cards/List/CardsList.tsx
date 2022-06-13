import React from 'react';
import {useAppSelector} from "../../../../../@hooks/hooksIndex";
import CardsListEl from "../ListElement/CardsListEl";
import {Outlet} from "react-router-dom";

type Props = {};

const CardsList: React.FC<Props> = (props) => {
   const cards = useAppSelector((state) => state.cards.data);

   const cardsList = cards.map((card) => (
      <CardsListEl key={card._id} {...card}/>
   ));

   return (
      <div>
         <h1>Cards</h1>

         <p>You have {cardsList.length} active cards</p>
         <div className="list-group">{cardsList}</div>
          <main>
              <Outlet/>
          </main>
      </div>
   );
};

export default CardsList;
