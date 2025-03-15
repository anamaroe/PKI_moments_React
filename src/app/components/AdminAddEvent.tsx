'use client'  

import React from "react";
import styles from "./AdminAddEvent.module.css";

const AddEvent = () => {

    function onAddEvent() {
        // otvaranje stranice za dodavanje novog dogadjaja
        window.location.href = "/adminNewEvent"
    }

    return (
        <div className={styles.container} onClick={onAddEvent} style={{ cursor: "pointer" }}>
            <div className={styles.newEvent}>
                <img src="/plus.png" />
                <p>DODAJ DOGAĐAJ</p>
            </div>
        </div>
    );
    
};


export default AddEvent;