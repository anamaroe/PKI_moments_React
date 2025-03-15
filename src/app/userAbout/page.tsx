'use client'

import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu'; 
import styles from "./page.module.css";

const AboutPage = () => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? (
        <div>
            <Menu/>

            <div className={styles.title}>
                <p>O NAMA</p>
            </div>

            <div className={styles.mapContainer}>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8729.726511821142!2d144.96625802319394!3d-37.81615344065083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b7b08f87f5%3A0xa94a6c9c48406886!2sThe%20Duke%20of%20Wellington!5e1!3m2!1ssr!2srs!4v1739208719797!5m2!1ssr!2srs" 
                    width="100%" 
                    height="450"   
                    allowFullScreen="{false}" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <div className={styles.contactText}>
                <p>KONTAKT: 067 408 123</p>
            </div>

        </div>
    ) : (
        <p>Loading map...</p>
    );
};

export default AboutPage;