'use client'

import React from 'react';
import styles from "./page.module.css";
import AdminMenu from '../components/AdminMenu';
import AdminNotifications from '../components/AdminNotification';

const HomePage = () => {

    return (
        <div className={styles.container}>
            <AdminMenu/>
            
            <div className={styles.content}>
                <div className={styles.title}>
                    <p>ZAKAZIVANJA</p>
                </div>

                <AdminNotifications/>
            </div>
            
            <footer className={styles.footer}>
                <p>LOLA STUDIO</p>
                <p>© 2020 - 2024</p>
                <p>TRENUCI ZA PAMĆENJE</p>
            </footer>

        </div>
    );
};

export default HomePage;