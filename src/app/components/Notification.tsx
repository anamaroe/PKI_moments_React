'use client'

import React from 'react';
import styles from "./Notification.module.css";

const Notification = ({ eventType, eventDate, guestCount, confirmed, dateOfProcessing }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("sr-Latn-RS", {
            day: "numeric",
            month: "long",
            year: "numeric",
            localeMatcher: "lookup"
        });
    };

    let eventName : string;
    let isConfirmed : string;
    let confirmationDate : string;
    let dateOfEvent : string = formatDate(eventDate);

    if(eventType == "r") {
        eventName = "Rođendan";
    } else if(eventType == "v") {
        eventName = "Venčanje"; 
    } else if(eventType == "p") {
        eventName = "Punoletstvo"; 
    } else if(eventType == "g") {
        eventName = "Godišnjica"; 
    } else if(eventType == "m") {
        eventName = "Matura"; 
    } else if(eventType == "k"){
        eventName = "Korporativni događaj"; 
    } else {
        //eventName = eventType.toLowerCase();
        eventName = eventType.charAt(0).toUpperCase() + eventType.slice(1).toLowerCase();
    };

    if(confirmed) {
        isConfirmed = "Potvrđeno";
    } else {
        isConfirmed = "Odbijeno";
    }

    if (dateOfProcessing) { 
        const processingDate = new Date(dateOfProcessing);  
        const today = new Date(); 

        const processingDateCopy = new Date(processingDate);
        const todayCopy = new Date(today);

        processingDateCopy.setHours(0, 0, 0, 0);
        todayCopy.setHours(0, 0, 0, 0);

        if (processingDateCopy.getTime() === todayCopy.getTime()) {
            confirmationDate = processingDate.toLocaleTimeString("sr-Latn-RS", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Europe/Belgrade"
            });
        } else {
            confirmationDate = formatDate(dateOfProcessing);
        }
    }

    return (

        <div className={styles.notification}>
            <div className={styles.details}>

                <div className={styles.dateTimeOfProcessing}>
                    {confirmationDate}
                </div>
                    
                <div className={styles.eventName}>  
                    <img src="admin_cheer.png" height={30}></img>
                    {eventName}
                </div>
                
                <div className={styles.eventDate}> 
                    <img src="admin_date.png" height={30}></img>
                    {dateOfEvent}
                </div>
                
                <div className={styles.guestCnt}>  
                    <img src="admin_group.png" height={30}></img>
                    {guestCount}
                </div>

                <div className={styles.isConfirmed}>
                    {isConfirmed}
                </div>

            </div>
        </div>


        
    );
};

export default Notification;