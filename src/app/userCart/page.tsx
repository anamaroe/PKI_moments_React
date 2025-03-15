'use client'

import React, { useEffect, useState } from 'react'; 
import Menu from '../components/Menu';
import styles from "./page.module.css";
import CartItem from '../components/CartItem';
import CartItemConfirmed from '../components/CartItemConfirmed';
import cartHelper from '../hooks/cartHelper';

const CartPage = () => {

    const {
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
    } = cartHelper("eventType");
    
    return (
        <div className={styles.pageContainer}>
            <Menu />
            <div className={styles.content}>

                <div className={styles.title}>
                    <p>KORPA</p>
                </div>

                <div className={styles.cartItems}>
                    {cart.length === 0 ? (
                        <p className={styles.empty}>Korpa je prazna.</p>
                    ) : (
                        <>
                            {cart.filter(item => item.confirmed === false).map((item, index) => (
                                <CartItem 
                                    key={`unconfirmed-${index}`}
                                    eventType={item.event}
                                    date={item.date}
                                    guestCount={item.guestCount}
                                    onConfirm={() => confirmItem(item.id)}
                                    onReject={() => rejectItem(item.id)}
                                />
                            ))}
                            {cart.filter(item => item.confirmed === true).map((item, index) => (
                                <CartItemConfirmed 
                                    key={`confirmed-${index}`} 
                                    eventType={item.event}
                                    date={item.date}
                                    guestCount={item.guestCount}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
            
            <footer className={styles.footer}>
                <p>LOLA STUDIO</p>
                <p>© 2020 - 2024</p>
                <p>TRENUCI ZA PAMĆENJE</p>
            </footer>
        </div>
    );
};

export default CartPage;