import React, {FC, useState} from 'react';
import './Navigation.scss';
import NavigationHeader from "./header/NavigationHeader/NavigationHeader";
import MainNavigation from "./header/MainNavigation/MainNavigation";
import {useAppSelector} from "../../../../@hooks/hooksIndex";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

    const toggleMobileNav = () => setIsMobileNavVisible((prevState) => !prevState);
    const user = useAppSelector((state) => state.profile.data);

    return (
        <div className="row">
            <div className="col">
                <section className="module navigation">
                    <NavigationHeader toggleMobileNav={toggleMobileNav} user={user} />
                    <MainNavigation isMobileNavVisible={isMobileNavVisible} />
                </section>
            </div>
        </div>
    );
};

export default Navigation;
