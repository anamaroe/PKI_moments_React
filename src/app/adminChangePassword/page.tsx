'use client'

import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import styles from "./page.module.css"; 
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import AdminMenu from '../components/AdminMenu';

const AdminProfilePassPage = () => {

    const router = useRouter();

    const goBackToProfile = () => { 
        router.push("/adminProfileView");
    }

    const [username, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newAgain, setNewAgain] = useState(""); 

    // ostali podaci
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        setUserPassword(localStorage.getItem("admin_password")); 
        setUsername(localStorage.getItem("admin_username"));
        setName(localStorage.getItem("admin_name"));
        setSurname(localStorage.getItem("admin_surname"));
        setAddress(localStorage.getItem("admin_address"));
        setPhone(localStorage.getItem("admin_phone"));
    }, []);

    const handleChangeData = () => {
        if(userPassword === oldPassword && newPassword === newAgain) {
            localStorage.setItem("admin_password", newPassword);
            setUserPassword(newPassword);

            // ako je vec menjan user: ceo je u localstorageu, menjam mu jedno polje
            const storedUser = localStorage.getItem(username);
            if(storedUser != null) {
                try {

                    const u = JSON.parse(storedUser);    
                    u.password = newPassword;
                    localStorage.setItem(username, JSON.stringify(u));  

                } catch(error) {
                    console.log("Error parsing user data:", error);
                } 

            } else {
                // nije menjan -> cuvam ga celog
                const updatedUser = {
                    username: username,
                    password: newPassword,
                    name: name, 
                    surname: surname,
                    address: address,
                    phone: phone
                }
                localStorage.setItem(username, JSON.stringify(updatedUser));
            }

            Swal.fire({
                icon: "success",
                iconColor: "#959595",
                text: "Lozinka je ažurana.",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000
            });
            goBackToProfile();
        } else {
            Swal.fire({
                icon: "info",
                iconColor: "#959595",
                text: "Morate uneti ispravne podatke.",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000
            });
        }
    };

    return (
        <div>
            <AdminMenu />

            <div className={styles.title}>
                <p>MOJ PROFIL</p>
            </div>

            <div className={styles.pageContent}>

                <div className={styles.userData}>
                    <div className={styles.fields}>
                        <span>stara lozinka</span>
                        <span className={styles.name}>nova lozinka</span>
                        <span className={styles.surname}>ponovi lozinku</span> 
                    </div>
                    <div className={styles.values}>
                        <input type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}/>
                        <input type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}/>
                        <input type="password"
                            value={newAgain}
                            onChange={(e) => setNewAgain(e.target.value)}/>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button className="btn" type="submit" onClick={goBackToProfile}>ODUSTANI</button>
                    <button className="btn" type="submit" onClick={handleChangeData}>SAČUVAJ</button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePassPage;