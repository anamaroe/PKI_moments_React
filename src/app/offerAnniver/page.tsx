'use client'

import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Comment from '../components/CommentCard';
import NewComment from '../components/CommentAdd';
import styles from "./page.module.css";   
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import cartHelper from '../hooks/cartHelper';
import commentsHelper from '../hooks/commentsHelper';

const OfferAnniversary = () => {

    // event data
    const eventTitle = "GODIŠNJICE";
    const eventNames = ["godišnjicu", "godišnjice"];
    const eventPrice = "100 €";
    const eventType = "g";
    const eventPhoto = "/godisnji.jpg"
    const eventDescription = `Proslava godišnjica je prilika da obeležite važne trenutke u životu, bilo
        da se radi o godišnjici braka, poslovnog uspeha ili posebnog
        prijateljstva. Agencija „Trenuci za pamćenje“ nudi jedinstvene ideje i
        vrhunsku organizaciju kako bi vaša godišnjica bila nezaboravna.
        Uživajte u pažljivo osmišljenim dekoracijama, prilagođenom meniju i
        atmosferi koja odražava vaš stil i priču.`
        
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
    } = cartHelper(eventType);
    
    const { comments, 
        newComment, 
        newRating, 
        isCommentModalOpen, 
        setNewComment, 
        setNewRating, 
        handleAddComment, 
        handleOpenCommentModal, 
        handleCloseCommentModal 
    } = commentsHelper(eventType);
    
    return (
        <div>
            <Menu/>

            <div className={styles.title}>
                <p>{eventTitle}</p>
            </div>

            <div className={styles.offerContainer}>

                <div className={styles.imageContainer}>
                    <img src={eventPhoto} alt="photo" />
                </div>

                <div className={styles.aboutOffer}>
                    {eventDescription}
                    <div className={styles.buyingContainer}>
                        <span className={styles.price}>
                            cena: {eventPrice} 
                        </span>  
                        <button className="btn" type="submit" onClick={handleOpenCartModal}>DODAJ U KORPU</button>
                    </div>
                </div> 
            </div>

            <div className={styles.subtitle}>
                <p>OCENE I KOMENTARI</p>
            </div>

            <div className={styles.ratings}>
                {comments.map(comment => (
                    <Comment key={comment.id} text={comment.text} rating={comment.rating} />
                ))}
                <NewComment onAddComment={handleOpenCommentModal} /> 
            </div> 

            {isCommentModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>NOVI KOMENTAR</h3>

                        <div className={styles.comment}>
                            <div className={styles.spans}>
                                <span>ocena:</span>
                                <br/><br/>
                                <div className={styles.space}></div>
                                <span>komentar:</span>
                            </div>
                            <div className={styles.fields}>
                                <input type="number"
                                    required={true}
                                    value={newRating}
                                    onChange={(e) => setNewRating(e.target.value)}
                                    min="1"
                                    max="5"
                                    placeholder="unesi ocenu od 1 do 5">
                                </input>
                                <br/>
                                <textarea 
                                    maxLength={140}
                                    value={newComment} 
                                    onChange={(e) => setNewComment(e.target.value)} 
                                    placeholder="unesi komentar"
                                />
                            </div>
                        </div> 
                        <div className={styles.buttons}>
                            <button className="btn" type="submit" onClick={handleCloseCommentModal}>OTKAŽI</button>
                            <button className="btn" type="submit" onClick={handleAddComment}>POTVRDI</button>
                        </div>
                    </div>
                </div>
            )}

            {isCartModalOpen && (
                <div className={styles.modalOverlay}>

                    <div className={styles.modalContent}>
                        <h3>ZAKAZIVANJE DOGAĐAJA</h3>

                        <div className={styles.comment}>
                            <div className={styles.spans}>
                                <span>datum:</span>
                                <br/><br/>
                                <div className={styles.spaceGuests}></div>
                                <span>broj gostiju:</span>
                            </div>

                            <div className={styles.fields}>
                                <DatePicker
                                className={styles.datepicker}
                                selected={date}
                                required={true}
                                dateFormat="dd/MM/yyyy" 
                                placeholderText="izaberi datum"
                                onChange={handleDateChange} 
                                />
                                <br/>
                                <input type="number"
                                    required={true}
                                    value={newGuestCnt}
                                    onChange={(e) => setNewGuestCnt(e.target.value)}
                                    min="1"
                                    placeholder="unesi broj gostiju">
                                </input>
                            </div>
                        </div> 
                        <div className={styles.areUShureTxt}>
                            Dodaj {eventNames[0]} u korpu? Cena {eventNames[1]} je {eventPrice}.
                        </div>
                        
                        <div className={styles.buttons}>
                            <button className="btn" type="submit" onClick={handleCloseCartModal}>OTKAŽI</button>
                            <button className="btn" type="submit" onClick={addToCart}>POTVRDI</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default OfferAnniversary;