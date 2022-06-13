import React, { useState, useEffect } from 'react';
import IncomeChart from "../Charts/IncomeChart";
import Loader from "../../UI/Loader";
import {useAppSelector} from "../../../@hooks/hooksIndex";
import {getStats} from "../../../api/statsApi";

type Props = {};

type AccDetails = {
   type?: string;
   currency?: string;
   number?: number;
};

const IncomeStats: React.FC<Props> = (props) => {
   const [accDetails, setAccDetails] = useState<AccDetails>({});
   const [chartData, setChartData] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);

   const firstAccount = useAppSelector((state) => state.accounts.data[0]);

   const doGetStats = async () => {
      // Get account stats for the last 30 days
      // For the first user's account
      try {
         if(!firstAccount){
            return;
         }
         const res = await getStats(firstAccount._id, 30);

         setAccDetails(res.accDetails);
         setChartData(res.data);
         setIsLoaded(true);
      } catch (err) {
         setIsLoaded(false);
      }
   };

   useEffect(() => {
      doGetStats();
   }, [firstAccount]);

   if (!isLoaded) {
      return <Loader />;
   }

   return (
      <section className="module stats-widget">
         <h3>Income change stats (30 days)</h3>
         <p>
            <strong>{accDetails.type} account</strong>
            {' / '}
            {accDetails.currency?.toUpperCase()}
            {' / '}
            {accDetails.number}
         </p>

         <IncomeChart data={chartData} />
      </section>
   );
};

export default IncomeStats;
