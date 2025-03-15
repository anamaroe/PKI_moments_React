import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const commentsHelper = (eventType) => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState("");
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); 

    let commentsName = `comments_${eventType}`;

    useEffect(() => {
        const savedComments = localStorage.getItem(commentsName);
        if (savedComments) {
            try {
                setComments(JSON.parse(savedComments));
            } catch(error) {
                console.log("Error parsing comments from localStorage:", error);
                setComments([]); 
            }
        } else {
            const defaultComments = getDefaultComments(eventType);
            setComments(defaultComments);
            localStorage.setItem(commentsName, JSON.stringify(defaultComments));
        }
    }, [eventType]);

    const getDefaultComments = (eventType) => {
        switch (eventType) {
            case "g":
                return [
                    { id: 1, event: eventType, text: "Fantastično!", rating: 5 },
                    { id: 2, event: eventType, text: "Proslava je bila sjajna, sve je bilo lepo organizovano, ali mislim da bi dekoracija mogla biti malo bolja. Sve u svemu, zadovoljni smo!", rating: 4 },
                    { id: 3, event: eventType, text: "Super sramite se čestitke.", rating: 3 },
                ];
            case "r":
                return [
                    { id: 1, event: eventType, text: "Fantastično!", rating: 5 },
                    { id: 2, event: eventType, text: "Proslava je bila sjajna, sve je bilo lepo organizovano, ali mislim da bi dekoracija mogla biti malo bolja. Sve u svemu, zadovoljni smo!", rating: 4 },
                    { id: 3, event: eventType, text: "Super sramite se čestitke.", rating: 3 },
                ];
            case "k":
                return [
                    { id: 1, event: eventType, text: "Fantastično!", rating: 5 },
                    { id: 2, event: eventType, text: "Proslava je bila sjajna, sve je bilo lepo organizovano, ali mislim da bi dekoracija mogla biti malo bolja. Sve u svemu, zadovoljni smo!", rating: 4 },
                    { id: 3, event: eventType, text: "moze i bolje", rating: 3 },
                ];
            case "p":
                return [
                    { id: 1, event: eventType, text: `Proslava je bila sjajna, sve je bilo lepo organizovano, ali mislim da bi dekoracija mogla biti malo bolja. Sve u svemu, zadovoljni smo!`, rating: 4 },
                    { id: 3, event: eventType, text: `Nije lose`, rating: 5 },
                ];
            case "m":
                return [
                    { id: 1, event: eventType, text: `Sve je bilo baš kako treba, od dekoracije do hrane. Možda smo mogli malo bolju muziku, ali stvarno je bilo fenomenalno`, rating: 5 },
                ];
            case "v":
                return [
                    { id: 1, event: eventType, text: `Sve je bilo baš kako treba, od dekoracije do hrane. Možda smo mogli malo bolju muziku, ali stvarno je bilo fenomenalno`, rating: 5 },
                ];
            default:
        }
    };

    const handleAddComment = () => {
        if (newComment.trim() === "" || newRating === null || parseInt(newRating) < 1 || parseInt(newRating) > 5) {
            Swal.fire({
                icon: "info",
                iconColor: "#959595",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: "Molimo unesite validan komentar i ocenu (1-5).",
            });
            return;
        }

        const newCommentObj = {
            id: comments.length + 1,
            event: eventType,
            text: newComment,
            rating: parseInt(newRating),
        };

        const updatedComments = [newCommentObj, ...comments];
        setComments(updatedComments);
        localStorage.setItem(commentsName, JSON.stringify(updatedComments));

        Swal.fire({
            icon: "success",
            text: "Vaš komentar je dodat.",
            iconColor: "#959595",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        });

        setNewComment("");
        setNewRating(null);
        setIsCommentModalOpen(false);
    };
    
    return {
        comments,
        newComment,
        newRating,
        isCommentModalOpen,
        setNewComment,
        setNewRating,
        handleAddComment,
        handleOpenCommentModal: () => setIsCommentModalOpen(true),
        handleCloseCommentModal: () => setIsCommentModalOpen(false),
    };
};

export default commentsHelper;
