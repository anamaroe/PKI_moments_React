'use client'

import React, { useEffect, useState } from 'react';
import styles from "./CartItemConfirmed.module.css";

const CartItemConfirmed = ({ eventType, date, guestCount }) => {

    const [event, setEvent] = useState(null);
    
    let eventName : string;
    let imageSource : string;
    let eventPrice : string;

    useEffect(() => {
        const storedEvent = JSON.parse(localStorage.getItem("currentEvent") || '[]');
        setEvent(storedEvent);  
        //console.log(storedEvent)
    }, [eventType]);

    if(eventType == "r") {
        eventName = "ROĐENDAN";
        imageSource = "/bd.jpg";
        eventPrice = "500";
    } else if(eventType == "v") {
        eventName = "VENČANJE";
        imageSource = "/wd.jpg";
        eventPrice = "2000";
    } else if(eventType == "p") {
        eventName = "PUNOLETSTVO";
        imageSource = "/offers_18.jpg";
        eventPrice = "500";
    } else if(eventType == "g") {
        eventName = "GODIŠNJICA";
        imageSource = "/godisnji.jpg";
        eventPrice = "100";
    } else if(eventType == "m") {
        eventName = "MATURA";
        imageSource = "/mmm.jpeg";
        eventPrice = "600";
    } else if(eventType == "k") {
        eventName = "KORPORATIVNI DOGAĐAJ";
        imageSource = "/sed.jpg";
        eventPrice = "200";
    } else {
        // neki novi dogadjaj
        if(event != null) {
            eventName = event.name;
            imageSource = event.photo;
            eventPrice = event.price;
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("sr-Latn-RS", {
            day: "numeric",
            month: "long",
            year: "numeric",
            localeMatcher: "lookup"
        });
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.eventImage}>
                <img src={imageSource}></img>
            </div>

            <div className={styles.details}>
                <h3>{eventName}</h3>
                <br/>
                <span>{formatDate(date)}</span>
                <span>broj gostiju: {guestCount}</span>
                <span>cena: {eventPrice} €</span>
            </div>

            <div className={styles.confirmationText}>
                <span>
                    Zahtev za zakazivanje događaja je prosleđen organizatoru.
                </span>
            </div>
        </div>
    );
};

export default CartItemConfirmed;