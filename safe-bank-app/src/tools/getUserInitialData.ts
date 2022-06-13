import {getMyself} from "../api/usersApi";
import {getMyAccounts} from "../api/accountsApi";
import {getMyTransfers} from "../api/transfersApi";
import {getMyCards} from "../api/cardsApi";
import {getMyMessages} from "../api/messagesApi";

// Fetch data for all the sections
const getUserInitialData = async () => {
   try {
      const data = {
         user: await getMyself(),
         accounts: await getMyAccounts(),
         cards: await getMyCards(),
         transfers: await getMyTransfers(),
         messages: await getMyMessages(),
      };

      return data;
   } catch (err:any) {
      throw new Error(err);
   }
};

export default getUserInitialData;
