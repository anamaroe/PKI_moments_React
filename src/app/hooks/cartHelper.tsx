'use client'

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from "./cartHelper.module.css";
import AdminNotifications from '../components/AdminNotification';

const cartHelper = (eventType) => {

    const [cart, setCart] = useState([]);
    const [newGuestCnt, setNewGuestCnt] = useState("");
    const [date, setDate] = useState(null);

    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    
    const handleOpenCartModal = () => { setIsCartModalOpen(true); };
    const handleCloseCartModal = () => { setIsCartModalOpen(false); };
    const handleDateChange = (selectedDate) => { setDate(selectedDate); };

    let username = localStorage.getItem("username");
    let cartName = `cart_${username}`; 

    // nakon confirmItema treba da se napravi notifikacija za admina
    const [adminNotifs, setAdminNotifs] = useState([]);
    const adminNotificationsString = "notif_admin";

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem(cartName)) || [];
        setCart(savedCart);

        console.log('Username:', username);
        console.log('Cart Name:', cartName); 



        const adminsNotifications = JSON.parse(localStorage.getItem("notif_admin"));
        setAdminNotifs(adminsNotifications)

    }, [eventType, cartName]); 

    const addToCart = () => {
        if (date === null || !newGuestCnt.trim()) {
            Swal.fire({
                icon: "info",
                iconColor: "#959595",
                text: "Potrebno je uneti sve podatke.",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000
            });
            return;
        }

        const newCartItem = {
            id: Date.now(),  
            user: username,
            confirmed: false,
            guestCount: newGuestCnt,
            event: eventType,
            date: date
        };

        const updatedCart = [newCartItem, ...cart];  
        setCart(updatedCart);
        localStorage.setItem(cartName, JSON.stringify(updatedCart));

        setNewGuestCnt("");
        setDate(null);
        setIsCartModalOpen(false);

        Swal.fire({
            icon: "success",
            iconColor: "#959595",
            text: "Događaj je dodat u korpu.",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    };

    const confirmItem = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, confirmed: true } : item
        );
        setCart(updatedCart);
        localStorage.setItem(cartName, JSON.stringify(updatedCart));
        const itemToConfirm = cart.find((item) => item.id === id);
        
        if(itemToConfirm) {
            const newAdminNotification = {
                id: id,  
                user: username,
                guestCount: itemToConfirm.guestCount,
                event: itemToConfirm.event,
                date: itemToConfirm.date
            };

            const updatedNotifs = [newAdminNotification, ...adminNotifs];  
            setAdminNotifs(updatedNotifs);
            localStorage.setItem(adminNotificationsString, JSON.stringify(updatedNotifs));
        }
    }; 

    const rejectItem = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({ });
        swalWithBootstrapButtons.fire({
            text: "Da li ste sigurni da želite da uklonite događaj iz korpe?",
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
            const updatedCart = cart.filter((item) => item.id !== id);
            setCart(updatedCart);
            localStorage.setItem(cartName, JSON.stringify(updatedCart));

            swalWithBootstrapButtons.fire({
            text: "Događaj je uklonjen iz korpe.",
            icon: "success",
            iconColor: "#959595",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
            text: "Događaj nije uklonjen iz korpe.",
            icon: "error",
            iconColor: "#959595",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
            });
        }});
    }

    return {
        cart,
        addToCart,
        setNewGuestCnt,
        setDate,
        newGuestCnt,
        date,
        isCartModalOpen,
        handleOpenCartModal,
        handleCloseCartModal,
        handleDateChange,
        confirmItem,
        rejectItem
    }; 
};

export default cartHelper;
