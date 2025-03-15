'use client'

import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import styles from "./page.module.css";

const EventsPage = () => {

    const [newEvents, setNewEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events") || '[]');
        setNewEvents(storedEvents);

        const curPg = localStorage.getItem("page");
        setCurrentPage(Number(curPg));
        console.log(currentPage)
    }, []);

    useEffect(() => {
        if (newEvents.length > 0) {
            const startIndex = currentPage * 3 - 6;
            const endIndex = startIndex + 3;
            const eventsToDisplay = newEvents.slice(startIndex, endIndex);
            setDisplayedEvents(eventsToDisplay);
            setTotalPages(Math.ceil(newEvents.length / 3) + 2);
        }
    }, [newEvents, currentPage]);

    const setupNextPage = () => {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');

        if(currentPage == totalPages - 1) {  
            localStorage.setItem("page", "0");
            window.location.href = "/userOffersFirst"
        } else {
            localStorage.setItem("page", (currentPage + 1).toString());
            window.location.href = "/userOffersRest"
        }
    }

    const setupPrevPage = () => { 
        if(currentPage == 2) { 
            localStorage.setItem("page", "1");
            window.location.href = "/userOffersSecond"
        } else {
            localStorage.setItem("page", (currentPage - 1).toString());
            window.location.href = "/userOffersRest"
        }
    }

    const openEventDetailsPage = (event) => {
        console.log(event)
        localStorage.setItem("currentEvent", JSON.stringify(event));
        window.location.href = "/offerExtra"
    }

    return (
        <div>
            <Menu />

            <div className={styles.title}>
                <p>DOGAĐAJI</p>
            </div> 

            <div className={styles.offersContainer}>
                
                {displayedEvents.map((event) => (
                    <div key={event.id}
                        onClick={() => openEventDetailsPage(event)}
                        style={{ cursor: "pointer" }}>
                        <p className={styles.uppercase}>{event.name}</p>
                        <img src={event.photo} alt="event photo"/>
                        <p className={styles.descriptionHeight}>{event.description}</p>
                    </div>
                ))}
            </div>
                
            <div className={styles.arrows}>
                <img src="/back.png" alt="Back" onClick={setupPrevPage} style={{ cursor: "pointer" }}/>
                <img src="/next.png" alt="Next" onClick={setupNextPage} style={{ cursor: "pointer" }}/>
            </div>
        </div>
    );
};

export default EventsPage;