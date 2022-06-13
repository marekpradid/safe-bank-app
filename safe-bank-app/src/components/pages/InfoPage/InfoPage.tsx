import React, {FC} from 'react';
import './InfoPage.scss';
import bankData from './infoBankData.json';
import InfoBox from "../../widgets/info/InfoBox/InfoBox";
import {useNavigate} from "react-router-dom";

interface InfoPageProps {
}

const InfoPage: FC<InfoPageProps> = () => {
    const navigate = useNavigate();

    return (
        <div className="infoPageContainer">
            <div className="infoHeader">
                <div className="left-arrow" onClick={() => navigate("/")}></div>
                <p className="font-weight-normal">Information</p>
            </div>
            <div className="blockHeader"><p className="font-weight-normal">Link 24</p></div>
            <div className="infoDiv">
                <InfoBox  infoBoxTitle="Payment Card Blocking" infoBoxText="from SR" infoBoxValue={bankData.telBlokingCards}/>
            </div>
            <div className="infoDiv">
                <InfoBox  infoBoxTitle="Safe Bank assistance service" infoBoxText="from SR" infoBoxValue={bankData.telAssistanceService}/>
            </div>
            <div className="blockHeader"><p className="font-weight-normal">Info Link - Electronic Banking</p></div>
            <div className="infoDivNoBorder">
                <InfoBox  infoBoxTitle="SmartBanking/My Safe Bank" infoBoxText="from SR" infoBoxValue={bankData.infoLinkFromSR}/>
            </div>
            <div className="infoDivNoBorderNoTitle">
                <InfoBox  infoBoxText="from Abroad" infoBoxValue={bankData.infoLinkFromAbroad}/>
            </div>
            <div className="infoDivNoBorderNoTitle">
                <InfoBox  infoBoxText="e-mail" infoBoxValue={bankData.infoLinkEmail}/>
            </div>
            <div className="blockHeader"><p className="font-weight-normal">Company Headquarters Address</p></div>
            <div className="infoDivBankData">
                <div className="bankAddress" style={{marginTop: "0.25rem"}}>{bankData.addressOfBank.name}</div>
                <div className="bankAddress">{bankData.addressOfBank.street}</div>
                <div className="bankAddress">{bankData.addressOfBank.postalCode}  {bankData.addressOfBank.city}</div>
                <div className="bankAddress">{bankData.addressOfBank.state}</div>
            </div>
        </div>);
};

export default InfoPage;
