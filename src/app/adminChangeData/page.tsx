'use client'

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css"; 
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import AdminMenu from '../components/AdminMenu';

const AdminProfileDataPage = () => {

    const router = useRouter();

    const goBackToProfile = () => { 
        router.push("/adminProfileView");
    }

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null); 

    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPhone, setNewPhone] = useState("");

    useEffect(() => {
        setUsername(localStorage.getItem("admin_username"));
        setPassword(localStorage.getItem("admin_password"));
        setName(localStorage.getItem("admin_name"));
        setSurname(localStorage.getItem("admin_surname"));
        setAddress(localStorage.getItem("admin_address"));
        setPhone(localStorage.getItem("admin_phone"));
    }, []);

    const handleChangeData = () => {
        if (newName) localStorage.setItem("admin_name", newName);
        if (newSurname) localStorage.setItem("admin_surname", newSurname);
        if (newAddress) localStorage.setItem("admin_address", newAddress);
        if (newPhone) localStorage.setItem("admin_phone", newPhone);

        if (newName) setName(newName);
        if (newSurname) setSurname(newSurname);
        if (newAddress) setAddress(newAddress);
        if (newPhone) setPhone(newPhone);

        // ako je vec menjan user: ceo je u localstorageu, menjam mu jedno polje
        const storedUser = localStorage.getItem(username);
        if(storedUser != null) {
            try {

                const u = JSON.parse(storedUser);   
                console.log("before: " + storedUser)
                if (newName) u.name = newName;
                if (newSurname) u.surname = newSurname;
                if (newAddress) u.address = newAddress;
                if (newPhone) u.phone = newPhone;
                
                localStorage.setItem(username, JSON.stringify(u));  
                console.log(username)
                console.log(u)

            } catch(error) {
                console.log("Error parsing user data:", error);
            } 

        } else {
            // nije menjan -> cuvam ga celog
            const updatedUser = {
                username: username,
                password: password,
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
            text: "Podaci su ažurirani.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000
        });

        goBackToProfile();
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
                        <span>korisničko ime</span>
                        <span className={styles.name}>ime</span>
                        <span className={styles.surname}>prezime</span>
                        <span className={styles.address}>adresa</span>
                        <span className={styles.phone}>telefon</span>
                    </div>
                    <div className={styles.values}>
                        <span>{username}</span> 
                        <input type="text"
                            placeholder={name}
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}/>
                        <input type="text"
                            placeholder={surname}
                            value={newSurname}
                            onChange={(e) => setNewSurname(e.target.value)}/>
                        <input type="text"
                            placeholder={address}
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}/>
                        <input type="text"
                            placeholder={phone}
                            value={newPhone} 
                            onChange={(e) => setNewPhone(e.target.value)}/>
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

export default AdminProfileDataPage;