'use client'

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import AdminMenu from '../components/AdminMenu';
import Swal from 'sweetalert2';

const NewEventPage = () => {

    const [eventName, setEventName] = useState("");
    const [eventPrice, setEventPrice] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventPhoto, setEventPhoto] = useState<string | null>(null);

    const onAddEvent = () => {
        if(eventName.trim() === "" || eventPrice.trim() === "" || eventDescription.trim() === "" || !eventPhoto || eventPhoto.trim() === "") {
            Swal.fire({
                icon: "warning",
                iconColor: "#959595",
                text: "Niste uneli sve podatke.",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return;
        }
        const events = JSON.parse(localStorage.getItem("events") || '[]');
        const newEvent = {
            id: new Date().getTime(),  
            photo: eventPhoto,
            name: eventName,
            price: eventPrice,
            description: eventDescription
        };
        events.push(newEvent);       
        localStorage.setItem("events", JSON.stringify(events));

        Swal.fire({
            icon: "success",
            iconColor: "#959595",
            text: "Novi događaj je dodat.",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });

        setEventName("");
        setEventPrice("");
        setEventDescription("");
        setEventPhoto(null);
    }

    const onCancelAdding = () => {
        window.location.href = "/adminEvents"
    }

    const handleSelect = (imagePath: string) => {
        setEventPhoto(imagePath);
    };

    return (
        <div className={styles.container}>
            <AdminMenu/>
            
            <div className={styles.content}>
                <div className={styles.title}>
                    <p>NOVI DOGAĐAJ</p>
                </div>
                <div className={styles.inputs}>

                    <div className={styles.naziv}>
                        <span>naziv &nbsp;</span>
                        <input type="text"
                            placeholder="naziv novog događaja"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}></input>
                    </div>

                    <div className={styles.cena}>
                        <span>cena &nbsp;</span>
                        <input type="number"
                            placeholder="cena događaja"
                            value={eventPrice}
                            onChange={(e) => setEventPrice(e.target.value)}></input>
                    </div>

                    <div className={styles.opis}>
                        <span> opis &nbsp; &nbsp;</span>
                        <input type="text"
                            placeholder="opis događaja"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}></input>
                    </div>

                    <div  className={styles.choosePhoto}>
                        <span>odaberi sliku</span>
                    </div>
                
                    <div className={styles.event}>
                        {["/hghg.jpg", "/hfghfgh.jpg", "/How to Bring Nature Into Your Indoor Wedding.jpg", "/Registry Bistro Wedding Venue Toledo OH 43604.jpg"].map((img) => (
                            <img
                                key={img}
                                src={img}
                                alt="photo"
                                className={eventPhoto === img ? styles.selected : ""}
                                onClick={() => handleSelect(img)}
                            />
                        ))}
                    </div>

                    <div className={styles.buttons}>
                        <button className="btn" type="submit" onClick={onCancelAdding} >ODUSTANI</button>
                        <button className="btn" type="submit" onClick={onAddEvent}>POTVRDI</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewEventPage;