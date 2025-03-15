'use client'

import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let users = [
    { username: "ana", password: "a"},
    { username: "pera", password: "p" }
  ]

  let userData = [
    { username: "ana", password: "a", name: "Ana", surname: "Anic", address: "Pariska 49", phone: "067 408 557" },
    { username: "pera", password: "p", name: "Pera", surname: "Peric", address: "Belavista 49", phone: "067 804 557" }
  ]

  const router = useRouter();

  function loginUser(e) {
    e.preventDefault();

    // ako sam upamtila tog usera sa izmenjenim podacima
    const storedUser = localStorage.getItem(username);
    if(storedUser) {
      try {
        const u = JSON.parse(storedUser);    
        if (u.username === username && u.password === password) {  

          console.log("to je taj " + username + " " + password)

          localStorage.setItem("username", u.username);
          localStorage.setItem("password", u.password);

          localStorage.setItem("name", u.name);
          localStorage.setItem("surname", u.surname);
          localStorage.setItem("address", u.address);
          localStorage.setItem("phone", u.phone);

          router.push("/userHome"); 
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
    
    // ako useru nisu menjani podaci: 
    const userExists = users.find(user => user.username === username && user.password === password);

    if (userExists) {
      //localStorage.clear();        

      const userDetails = userData.find(user => user.username === username && user.password === password);

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      localStorage.setItem("name", userDetails.name);
      localStorage.setItem("surname", userDetails.surname);
      localStorage.setItem("address", userDetails.address);
      localStorage.setItem("phone", userDetails.phone);

      router.push("/userHome"); 

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

          <button className="btn" type="submit" onClick={loginUser}>LOGIN</button>

          <a href="/loginAdmin" className={styles.organizerLink}>
            prijavi se kao organizator &gt;
          </a>
        
        </div>
      </main> 

    </div>
  );
}
