import React from 'react';
import './style.scss';
import {useAppSelector} from "../../../../@hooks/hooksIndex";
import ProfileHeader from "./Header/ProfileHeader";
import ProfileStats from "./Stats/ProfileStats";
import ProfileLinks from "./Links/ProfileLinks";

type Props = {};

const Profile: React.FC<Props> = (props) => {
   const profile = useAppSelector((state) => state.profile.data);

   const links = [
      { href: '/panel/transfers', text: 'Transfers', icon: 'ion-card' },
      {
         href: '/panel/change-details',
         text: 'Change details',
         icon: 'ion-android-checkbox-outline',
      },
   ];

   return (
      <div className="row panel-content">
         <div className="col">
            <section className="module profile">
               <ProfileHeader profile={profile} />
               <ProfileStats stats={profile.stats} />
               <ProfileLinks links={links} />
            </section>
         </div>
      </div>
   );
};

export default Profile;
