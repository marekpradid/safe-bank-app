import React from 'react';
import {useAppSelector} from "../../../../../@hooks/hooksIndex";
import {useLocation, useParams} from "react-router-dom";
import CardInfobox from "../Infobox/CardInfobox";


interface Params {
    cardId: string;
}

interface Props {
}

const SingleCard: React.FC<Props> = (props) => {
    const params = useParams();
    const location = useLocation();
    const cardId = params.cardId;
    const singleCard = useAppSelector((state) => state.cards.data.find((el) => el._id === cardId));

    return (
        <div className="row">
            <div className="col">
                <CardInfobox {...singleCard} currentUrl={location.pathname}/>
            </div>
        </div>
    );
};

export default SingleCard;
