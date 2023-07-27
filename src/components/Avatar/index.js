import "./style.css";
import React, { useState, useEffect, useRef } from 'react';
import { getMyAvatarImagePath } from "../../api/avatar";
import { setGreeting } from "../../api/room";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Avatar = ({ user, room, isMyRoom }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState('');
    const bubbleRef = useRef(null);
    const [show, setShow] = useState(true);
    const [greetingMessage, setGreetingMessage] = useState(null);
    const timer = useRef(null);
    const { data } = useQuery({
        queryKey: ["avatar image", user],
        queryFn: async () => {
            if (user !== null) {
                const { data } = await getMyAvatarImagePath(user._id);
                return data;
            }
            else return null;
        }
    })

    const handleDoubleClick = () => {
        if (isMyRoom) {
          setIsEditing(true);
          setEditedText(greetingMessage);
          if (timer.current !== null) clearTimeout(timer.current);
        }
    };

    const handleKeyDown = (event) => {
        if (isMyRoom && event.key === 'Enter') {
            setGreeting(room._id, editedText);
            setGreetingMessage(editedText);
            setIsEditing(false);
        }
      };
    const handleMouseOver = () => {
        if (timer.current !== null) clearTimeout(timer.current);
        setShow(true)
    }
    const handleMouseLeave = () => {
        if (!isEditing) {
            timer.current = setTimeout(() => {
                setShow(false)
            }, 2000)
        }
    }
    useEffect(() => {
        if (room !== null) {
            setGreetingMessage(room.greeting);
            setEditedText(room.greetingMessage);
            timer.current = setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }, [room])

    

    return (
        <div className="container" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div
                className={`speech-bubble${isMyRoom ? ' editable' : ''}${show ? '' : ' hidden'}`}
                onDoubleClick={handleDoubleClick}
                ref={bubbleRef}
            >
            <div id="bub-part-a"></div>
		    <div id="bub-part-b"></div>
		    <div id="bub-part-c"></div>
            {isEditing ? (
                <input
                    id = "speech-txt"
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <div id = "speech-txt">{greetingMessage}</div>
            )}
            <div id="bub-part-c"></div>
            <div id="bub-part-b"></div>
            <div id="bub-part-a"></div>
            <div id="speech-arrow">
                <div id="arrow-w"></div>
                <div id="arrow-x"></div>
                <div id="arrow-y"></div>
                <div id="arrow-z"></div>
                </div>

            </div>
            {data ? <LazyLoadImage src={data.avatarImagePath} alt="avatar" width={100} height={100} effect="blur" /> : <Skeleton variant="rounded" width={80} height={80}  /> }
        </div>
    )
}

export default Avatar;