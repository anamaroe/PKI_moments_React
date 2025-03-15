'use client'

import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Comment from '../components/CommentCard';
import NewComment from '../components/CommentAdd';
import styles from "./page.module.css";    
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import cartHelper from '../hooks/cartHelper';
import commentsHelper from '../hooks/commentsHelper';

const OfferEighteen = () => {

    // event data
    const eventTitle = "PUNOLETSTVA";
    const eventNames = ["punoletstvo", "punoletstva"];
    const eventPrice = "500 €";
    const eventType = "p";
    const eventPhoto = "/offers_18.jpg"
    const eventDescription = `Osamnaesti rođendan je trenutak kada se otvara novo poglavlje života,
        i zaslužuje da bude obeležen na poseban način. Agencija „Trenuci za
        pamćenje“ pruža vam sve što vam je potrebno za savršenu proslavu –
        od kreativne dekoracije do muzike koja podiže atmosferu. Neka vaša
        punoletstvo bude ispunjeno smehom, zabavom i trenutnim
        uspomenama koje ćete pamtiti zauvek!`
    
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

export default OfferEighteen;