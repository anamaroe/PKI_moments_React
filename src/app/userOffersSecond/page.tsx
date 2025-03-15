'use client'

import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import styles from "./page.module.css";

const UserOffersSecondPage = () => {
    
    useEffect(() => {
        localStorage.setItem("page", "1");
    }, []);

    const setupNextPage = () => {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        if(storedEvents === null) {
            localStorage.setItem("page", "0");
            window.location.href = "/userOffersFirst"
        } else {
            localStorage.setItem("page", "2");
            window.location.href = "/userOffersRest"
        }
    }

    return (
        <div>
            <Menu />

            <div className={styles.title}>
                <p>DOGAĐAJI</p>
            </div>

            <div className={styles.offersContainer}>
                <div onClick={() => window.location.href = "/offerAnniver"} 
                    style={{ cursor: "pointer" }}>
                    <p>GODIŠNJICE</p>
                    <img src="/godisnji.jpg" alt="anniverPhoto" />
                    <p>Proslavite važne godine ljubavi, uspeha ili
                        prijateljstva uz pažljivo osmišljene događaje koji
                        slave vašu priču.
                    </p>
                </div>
                <div onClick={() => window.location.href = "/offerGrad"} 
                    style={{ cursor: "pointer" }}>
                    <p>MATURE</p>
                    <img src="/mmm.jpeg" alt="gradPhoto" />
                    <p>Obeležite kraj jednog poglavlja i početak novog uz
                        nezaboravnu proslavu mature!
                    </p>
                </div>
                <div onClick={() => window.location.href = "/offerCorporate"} 
                    style={{ cursor: "pointer" }}>
                    <p>KORPORATIVNI DOGAĐAJI</p>
                    <img src="/sed.jpg" alt="corpPhoto" />
                    <p>Profesionalno osmišljeni događaji koji jačaju
                        timski duh i ostavljaju snažan utisak.
                    </p>
                </div>

            </div>

            <div className={styles.arrows}>
                <img src="/back.png" alt="Back" onClick={() => window.location.href = "/userOffersFirst"} style={{ cursor: "pointer" }}/>
                <img src="/next.png" alt="Next" onClick={setupNextPage} style={{ cursor: "pointer" }}/>
            </div>

        </div>
    );
};

export default UserOffersSecondPage;