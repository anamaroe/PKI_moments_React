'use client'

import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import styles from "./page.module.css";   


const UserOffersFirstPage = () => {

    useEffect(() => {
        localStorage.setItem("page", "0");
    }, []);
    
    const setupPrevPage = () => { 
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        let totalPages = Math.ceil(storedEvents.length / 3) + 2;
        if(totalPages > 2) {
            localStorage.setItem("page", (totalPages - 1).toString());
            window.location.href = "/userOffersRest"
        } else {
            localStorage.setItem("page", "1");
            window.location.href = "/userOffersSecond"
        }
    }

    return (
        <div>
            <Menu/>

            <div className={styles.title}>
                <p>DOGAĐAJI</p>
            </div>

            <div className={styles.offersContainer}>
                <div onClick={() => window.location.href = "/offerBday"} 
                    style={{ cursor: "pointer" }}>
                    <p>ROĐENDANI</p>
                    <img src="/bd.jpg" alt="bdayPhoto" />
                    <p>Detaljno osmišljenim programom stvaramo
                        savršenu atmosferu za vaš rođendan, koji
                        slavljeničku radost pretvara u nezaboravno
                        iskustvo.
                    </p>
                </div>
                <div onClick={() => window.location.href = "/offerWed"} 
                    style={{ cursor: "pointer" }}>
                    <p>VENČANJA</p>
                    <img src="/wd.JPG" alt="wedPhoto" />
                    <p>Stvaramo čarobnu atmosferu koja odražava ljubav
                        i čini vaš poseban dan nezaboravnim.
                    </p>
                </div>
                <div onClick={() => window.location.href = "/offerEighteen"} 
                    style={{ cursor: "pointer" }}>
                    <p>PUNOLETSTVA</p>
                    <img src="/home_18.png" alt="eighteenPhoto" />
                    <p>Obeležite svoj 18. rođendan uz nezaboravnu
                        proslavu koja spaja radost, zabavu i nezamenjive
                        uspomene.
                    </p>
                </div>
            </div>  

            <div className={styles.arrows}>
                <img src="/back.png" 
                    alt="Back" 
                    onClick={setupPrevPage} 
                    style={{ cursor: "pointer" }} 
                    />
                <img src="/next.png" 
                    alt="Next" 
                    onClick={() => window.location.href = "/userOffersSecond"} 
                    style={{ cursor: "pointer" }} />
            </div>
        </div>
    );
};

export default UserOffersFirstPage;