'use client'

import React from 'react';
import styles from "./Menu.module.css";
import { usePathname, useRouter } from 'next/navigation';

const Menu = () => {

    const pathname = usePathname();
    const router = useRouter();

    const goHome = () => {
        router.push("/userHome");
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 
                    onClick={goHome}
                    style={{ cursor: "pointer" }}>
                    TRENUCI ZA PAMĆENJE
                </h1>
            </div>
            <nav>
                <ul>
                <li><a href="/userHome"  
                    className={pathname === "/userHome" ? styles.active : ""}>početna</a></li>
                <li><a href="/userOffersFirst"  
                    className={pathname === "/userOffersFirst"
                        || pathname === "/userOffersSecond"
                        || pathname === "/userOffersRest"
                        || pathname === "/offerBday" 
                        || pathname === "/offerAnniver" 
                        || pathname === "/offerWed" 
                        || pathname === "/offerEighteen" 
                        || pathname === "/offerCorporate" 
                        || pathname === "/offerGrad" 
                        || pathname === "/offerExtra"
                        ? styles.active : ""}>ponude</a></li>
                <li><a href="/userAbout"  
                    className={pathname === "/userAbout" ? styles.active : ""}>o nama</a></li>
                <li><a href="/userCart"  
                    className={pathname === "/userCart" ? styles.active : ""}>korpa</a></li>
                <li><a href="/userProfileView"  
                    className={pathname === "/userProfileView"
                    || pathname === "/userProfilePassword" 
                    || pathname === "/userProfileData"  
                    ? styles.active : ""}>profil</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Menu;