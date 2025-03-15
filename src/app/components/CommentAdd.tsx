'use client'  

import React from "react";
import styles from "./CommentAdd.module.css";

const NewComment = ({ onAddComment }: { onAddComment: () => void }) => {
    return (
        <div className={styles.container} onClick={onAddComment} style={{ cursor: "pointer" }}>
            <div className={styles.newcomment}>
                <img src="/plus.png" />
                <p>DODAJ KOMENTAR</p>
            </div>
        </div>
    );
    
};


export default NewComment;
