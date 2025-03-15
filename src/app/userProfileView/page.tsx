'use client'

import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import styles from "./page.module.css";
import Notification from '../components/Notification';
import { useRouter } from 'next/navigation'; 
import Swal from 'sweetalert2';

const UserProfileViewPage = () => {

    const router = useRouter();

    const goToChangePassPage = () => { 
        router.push("/userProfilePassword");
    }

    const goToChangeDataPage = () => { 
        router.push("/userProfileData");
    }

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null); 

    const [notifications, setNotifications] = useState([]);
    const [notificationsString, setNotificationsString] = useState<string | null>(null);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        setPassword(localStorage.getItem("password"));
        setName(localStorage.getItem("name"));
        setSurname(localStorage.getItem("surname"));
        setAddress(localStorage.getItem("address"));
        setPhone(localStorage.getItem("phone"));
    }, []);

    useEffect(() => {
        const notificationsKey = "notif_" + username;
        const storedNotifications = JSON.parse(localStorage.getItem(notificationsKey) || "[]");
        setNotifications(storedNotifications);
        setNotificationsString(notificationsKey); 
    }, [username]);

    useEffect(() => {
        console.log(notifications)
        console.log(notificationsString)
    }, [notifications]);

    const logout = () => {
        const swalWithBootstrapButtons = Swal.mixin({});
        swalWithBootstrapButtons.fire({
            text: "Da li ste sigurni da želite da se odjavite?",
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
            router.push("/");
        }
        });
    } 

    return (
        <div>
            <Menu />

            <div className={styles.title}>
                <p>MOJ PROFIL</p>
            </div>

            <div className={styles.pageContent}>

                <div className={styles.userData}>
                    <div className={styles.fields}>
                        <span>korisničko ime</span>
                        <span>ime</span>
                        <span>prezime</span>
                        <span>adresa</span>
                        <span>telefon</span>
                    </div>
                    <div className={styles.values}>
                        <span>{username}</span>
                        <span>{name}</span>
                        <span>{surname}</span>
                        <span>{address}</span>
                        <span>{phone}</span>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button className="btn" type="submit" onClick={goToChangePassPage}>IZMENI LOZINKU</button>
                    <button className="btn" type="submit" onClick={goToChangeDataPage}>IZMENI PODATKE</button>
                </div>

                <div className={styles.subtitle}>
                    <p>OBAVEŠTENJA</p>
                </div>

                <div className={styles.notifications}>
                    {notifications.map((notification, index) => (
                        <Notification
                            key={index}  
                            eventType={notification.event || "N/A"}
                            eventDate={new Date(notification.eventDate)}
                            confirmed={notification.confirmed}
                            dateOfProcessing={new Date(notification.dateOfProcessing)}
                            guestCount={notification.guestCount}
                        />
                    ))}
                </div>

                <div className={styles.logoutBtn} onClick={logout} style={{ cursor: "pointer" }}>
                    <img src="/out.png" alt="logout icon"/>
                    <span>logout</span>
                </div>

            </div>
        </div>
    );
};

export default UserProfileViewPage;