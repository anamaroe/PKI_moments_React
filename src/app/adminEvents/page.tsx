'use client'

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import AdminMenu from '../components/AdminMenu';
import AddEvent from '../components/AdminAddEvent';


const EventsPage = () => {

    const [newEvents, setNewEvents] = useState([]);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        setNewEvents(storedEvents);
    }, []);

    return (
        <div className={styles.container}>

            <AdminMenu/>
            
            <div className={styles.content}>

                <div className={styles.title}>
                    <p>DOGAĐAJI</p>
                </div>

                <div className={styles.allEvents}> 

                    <AddEvent/>

                    <div className={styles.event}>
                        <span>ROĐENDANI</span>
                        <img src="/bd.jpg" alt="photo" />
                    </div>

                    <div className={styles.event}>
                        <span>VENČANJA</span>
                        <img src="/wd.jpg" alt="photo" />
                    </div>

                    <div className={styles.event}>
                        <span>PUNOLETSTVA</span>
                        <img src="/offers_18.jpg" alt="photo" />
                    </div>

                    <div className={styles.event}>
                        <span>GODIŠNJICE</span>
                        <img src="/godisnji.jpg" alt="photo" />
                    </div>

                    <div className={styles.event}>
                        <span>MATURE</span>
                        <img src="/mmm.jpeg" alt="photo" />
                    </div>

                    <div className={styles.event}>
                        <span>KORPORATIVNI DOGAĐAJI</span>
                        <img src="/sed.jpg" alt="photo" />
                    </div>

                    {newEvents.map((event, index) => (
                        <div key={index} className={styles.event}>
                            <span>{event.name}</span>
                            <img src={event.photo} alt={event.name} />
                        </div>
                    ))}
                </div>

            </div> 

        </div>
    );
};

export default EventsPage;