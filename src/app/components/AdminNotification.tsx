'use client'

import React, { useState, useEffect } from 'react';
import styles from "./AdminNotification.module.css";
import Swal from 'sweetalert2';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const adminNotifications = JSON.parse(localStorage.getItem("notif_admin")) || [];
        setNotifications(adminNotifications);
    }, []);

    const rejectNotification = (id) => {
        const notificationToAccept = notifications.find((notif) => notif.id === id);

        const swalWithBootstrapButtons = Swal.mixin({});
        swalWithBootstrapButtons.fire({
            text: "Odbij organizovanje događaja?",
            icon: "warning",
            iconColor: "#959595",
            showCancelButton: true,
            confirmButtonText: "DA",
            cancelButtonText: "NE",
            reverseButtons: true,
            didOpen: () => {
                document.querySelector(".swal2-confirm").classList.add(styles.swal_btn);
                document.querySelector(".swal2-cancel").classList.add(styles.swal_btn);
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {

                const userNotification = {
                    id: notificationToAccept.id,
                    dateOfProcessing: new Date().toISOString(),
                    
                    user: notificationToAccept.user,
                    event: notificationToAccept.event,
                    eventDate: notificationToAccept.date,
                    confirmed: false,
                    guestCount: notificationToAccept.guestCount,
                    key: notificationToAccept.id
                };

                const userNotificationsKey = `notif_${notificationToAccept.user}`;
                const userNotifications = JSON.parse(localStorage.getItem(userNotificationsKey)) || [];
                const updatedUserNotifications = [userNotification, ...userNotifications];
                localStorage.setItem(userNotificationsKey, JSON.stringify(updatedUserNotifications));
                
                const updatedNotifications = notifications.filter((notif) => notif.id !== id);
                setNotifications(updatedNotifications);
                localStorage.setItem("notif_admin", JSON.stringify(updatedNotifications));

                // jos: ukloniti tu stavku iz korisnikove korpe
                // adminNotifikacija i cart item imaju isti id...
                let userCartString = "cart_" + notificationToAccept.user;
                let userCart = [];
                try {
                    let storedData = localStorage.getItem(userCartString);
                    userCart = storedData ? JSON.parse(storedData) : [];
                } catch (error) {
                    console.error("Error parsing cart data:", error);
                }
                userCart = userCart.filter((item) => item.id !== id);
                localStorage.setItem(userCartString, JSON.stringify(userCart));

                Swal.fire({
                    text: "Odbijeno.",
                    icon: "success",
                    iconColor: "#959595",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        });
    };

    const acceptNotification = (id) => {
        const notificationToAccept = notifications.find((notif) => notif.id === id);
        const swalWithBootstrapButtons = Swal.mixin({});
        swalWithBootstrapButtons.fire({
            text: "Prihvati organizovanje događaja?",
            icon: "warning",
            iconColor: "#959595",
            showCancelButton: true,
            confirmButtonText: "DA",
            cancelButtonText: "NE",
            reverseButtons: true,
            didOpen: () => {
                document.querySelector(".swal2-confirm").classList.add(styles.swal_btn);
                document.querySelector(".swal2-cancel").classList.add(styles.swal_btn);
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                if (notificationToAccept) {

                    const userNotification = {
                        id: notificationToAccept.id, 
                        dateOfProcessing: new Date().toISOString(), 
                        user: notificationToAccept.user,
                        event: notificationToAccept.event,
                        eventDate: notificationToAccept.date,
                        confirmed: true,
                        guestCount: notificationToAccept.guestCount,
                        key: notificationToAccept.id
                    }; 

                    const userNotificationsKey = `notif_${notificationToAccept.user}`;
                    const userNotifications = JSON.parse(localStorage.getItem(userNotificationsKey)) || [];
                    const updatedUserNotifications = [userNotification, ...userNotifications];
                    localStorage.setItem(userNotificationsKey, JSON.stringify(updatedUserNotifications));
        
                    const updatedNotifications = notifications.filter((notif) => notif.id !== id);
                    setNotifications(updatedNotifications);
                    localStorage.setItem("notif_admin", JSON.stringify(updatedNotifications));

                    // jos: ukloniti tu stavku iz korisnikove korpe
                    let userCartString = "cart_" + notificationToAccept.user;
                    let userCart = [];
                    try {
                        let storedData = localStorage.getItem(userCartString);
                        userCart = storedData ? JSON.parse(storedData) : [];
                    } catch (error) {
                        console.error("Error parsing cart data:", error);
                    }
                    userCart = userCart.filter((item) => item.id !== id);
                    localStorage.setItem(userCartString, JSON.stringify(userCart));
        
                    Swal.fire({
                        text: "Prihvaćeno.",
                        icon: "success",
                        iconColor: "#959595",
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
            }
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("sr-Latn-RS", {
            day: "numeric",
            month: "long",
            year: "numeric",
            localeMatcher: "lookup"
        });
    };

    const formatEvent = (eventString) => {
        if(eventString === "r") {
            return "rođendan";
        } else if(eventString === "v") {
            return "venčanje";
        } else if(eventString === "p") {
            return "punoletstvo";
        } else if(eventString === "g") {
            return "godišnjica";
        } else if(eventString === "m") {
            return "matura";
        } else if(eventString === "k") {
            return "korporativni događaj";
        } else {
            return eventString.toLowerCase();
        }
    };

    return (
        <div className={styles.container}>
            {notifications.length === 0 ? (
                <p className={styles.empty}>Nema novih zahteva za zakazivanjem događaja.</p>
            ) : (
                notifications.map((notif) => (

                    <div key={notif.id} className={styles.notification}>
                        <div className={styles.details}>
                            
                            <div className={styles.username}>  
                                <img src="user.png" height={22}></img>
                                {notif.user}
                            </div>
                            
                            <div className={styles.eventName}>  
                                <img src="admin_cheer.png" height={30}></img>
                                {formatEvent(notif.event)}
                            </div>
                            
                            <div className={styles.eventDate}> 
                                <img src="admin_date.png" height={30}></img>
                                {formatDate(notif.date)}
                            </div>
                            
                            <div className={styles.guestCnt}>  
                                <img src="admin_group.png" height={30}></img>
                                {notif.guestCount}
                            </div>
                        
                        </div>
                        <div className={styles.buttons}>
                            <button className="btn" onClick={() => acceptNotification(notif.id)}>
                                PRIHVATI
                            </button>
                            <button className="btn" onClick={() => rejectNotification(notif.id)}>
                                ODBIJ
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminNotifications; 