'use client'  

import React from "react";
import styles from "./CommentCard.module.css";
import { FaStar } from "react-icons/fa";

const Comment = ({ text, rating }: { text: string; rating: number }) => {
    return (
        <div className={styles.container}>
            <div className={styles.comment}>
                <div className={styles.commentHeader}>
                    <div className={styles.stars}>
                    <img src="/user.png" />
                        {[...Array(5)].map((_, index) => (
                            index < rating ? <FaStar key={index} color="#626262" /> : <FaStar key={index} color="#95959577" />
                        ))}
                    </div>
                </div>
                <p>{text}</p>
            </div>
        </div>
    );
    
};


export default Comment;
