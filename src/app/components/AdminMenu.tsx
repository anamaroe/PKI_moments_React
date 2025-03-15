'use client'

import React from 'react';
import styles from "./AdminMenu.module.css";
import { usePathname, useRouter } from 'next/navigation';

const AdminMenu = () => {

    const pathname = usePathname();
    const router = useRouter();

    const goHome = () => {
        router.push("/adminHome");
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
                <li><a href="/adminHome"  
                    className={pathname === "/adminHome" ? styles.active : ""}>zakazivanja</a></li>
                <li><a href="/adminEvents" 
                    className={pathname === "/adminEvents" 
                    || pathname === "/adminNewEvent" ? styles.active : ""}>događaji</a></li>
                <li><a href="/adminProfileView"  
                    className={pathname === "/adminProfileView"
                    || pathname === "/adminChangePassword" 
                    || pathname === "/adminChangeData"  
                    ? styles.active : ""}>profil</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default AdminMenu;