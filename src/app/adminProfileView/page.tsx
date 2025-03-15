'use client'

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import AdminMenu from '../components/AdminMenu';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const ProfileViewPage = () => {

    const router = useRouter();

    const goToChangePassPage = () => { 
        router.push("/adminChangePassword");
    }

    const goToChangeDataPage = () => { 
        router.push("/adminChangeData");
    }

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null); 

    useEffect(() => {
        setUsername(localStorage.getItem("admin_username"));
        setPassword(localStorage.getItem("admin_password"));
        setName(localStorage.getItem("admin_name"));
        setSurname(localStorage.getItem("admin_surname"));
        setAddress(localStorage.getItem("admin_address"));
        setPhone(localStorage.getItem("admin_phone"));
    }, []);

    const logout = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            
        });
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
            <AdminMenu />

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
                
                <div className={styles.logoutBtn} onClick={logout} style={{ cursor: "pointer" }}>
                    <img src="/out.png" alt="logout icon"/>
                    <span>logout</span>
                </div>

            </div>

        </div>
    );
};

export default ProfileViewPage;