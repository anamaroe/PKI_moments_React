'use client'

import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const users = [
        { username: "admin", password: "a"}
    ]

    let userData = [
        { username: "admin", password: "a", name: "Admin", surname: "Adminic", address: "Ulica 49", phone: "067 557 431" },
    ]

    const router = useRouter();
    
    function loginAdmin(e) {
        e.preventDefault();

        // ako sam upamtila tog usera sa izmenjenim podacima
        const storedUser = localStorage.getItem(username);
        if(storedUser) {
            try {
                const u = JSON.parse(storedUser);    
                if (u.username === username && u.password === password) {  
        
                console.log("to je taj " + username + " " + password)
        
                localStorage.setItem("admin_username", u.username);
                localStorage.setItem("admin_password", u.password);
        
                localStorage.setItem("admin_name", u.name);
                localStorage.setItem("admin_surname", u.surname);
                localStorage.setItem("admin_address", u.address);
                localStorage.setItem("admin_phone", u.phone);
        
                router.push("/adminHome"); 

                } else {
                    Swal.fire({
                        text: "Pogrešni podaci.",
                        icon: "warning",
                        iconColor: "#959595",
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    return;
                }
                } catch(error) {
                    console.log("Error parsing user data:", error);
            } 
            return;
        }  

        const userExists = users.find(user => user.username === username && user.password === password);

        if (userExists) {
            const userDetails = userData.find(user => user.username === username && user.password === password);
    
            localStorage.setItem("admin_username", username);
            localStorage.setItem("admin_password", password);
        
            localStorage.setItem("admin_name", userDetails.name);
            localStorage.setItem("admin_surname", userDetails.surname);
            localStorage.setItem("admin_address", userDetails.address);
            localStorage.setItem("admin_phone", userDetails.phone);

            router.push("/adminHome"); 

        } else {
            Swal.fire({
                text: "Pogrešni podaci.",
                icon: "warning",
                iconColor: "#959595",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    }

    return (
    <div className={styles.container}> 

        <header className={styles.header}>
        <h1>TRENUCI ZA PAMĆENJE</h1>
        <hr />
        <p>- profesionalna organizacija nezaboravnih događaja -</p>
        </header> 

        <main className={styles.main}>

        <h2>LOGIN</h2> 

        <div className={styles.loginForm}>
            <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
                <Image src="/user.png" alt="User Icon" width={22} height={22} />
            </div>
            <input type="text" 
                    placeholder="Korisničko ime" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </div> 

            <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
                <Image src="/lock.png" alt="Lock Icon" width={25} height={25} />
            </div>
            <input type="password" 
                    placeholder="Lozinka" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>

            <button className="btn" type="submit" onClick={loginAdmin}>LOGIN</button>

            <a href="/" className={styles.organizerLink}>
            prijavi se kao kupac &gt;
            </a>
        
        </div>
        </main> 

    </div>
    );
}
