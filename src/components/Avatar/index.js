import "./style.css";
import React, { useState, useEffect, useRef } from 'react';
import { getMyAvatarImagePath } from "../../api/avatar";
import { getRoom,setGreeting } from "../../api/room";

const Avatar = ({user}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState('text');
    const bubbleRef = useRef(null);

    const [greetingMessage, getGreeting] = useState('');
    const [avatarImagePath, getAvatarImagePath] = useState('');
    const [myRoomId, getMyRoomId] = useState('');

    const value = localStorage.getItem("USER");
    const loginUser = value === null ? value : JSON.parse(value);
    // const isMyRoom = (user != null && userId === loginUser._id);
    const [isMyRoom, getIsMyRoom] = useState(false);

    const handleDoubleClick = () => {
        if (isMyRoom) {
          setIsEditing(true);
          setEditedText(editedText);
        }
    };

    const handleKeyDown = (event) => {
        if (isMyRoom && event.key === 'Enter') {
            setGreeting(myRoomId, editedText);
            getGreeting(editedText);
          setIsEditing(false);
        }
      };

    useEffect(() => {
        if(user != null) {
            getRoom(user._id).then(({data}) => {
                getMyRoomId(data._id);
                getGreeting(data.greeting);
                setEditedText(data.greeting);
            })
    
            getMyAvatarImagePath(user._id).then(({data}) =>  {
                getAvatarImagePath(data.avatarImagePath);
            })

            getIsMyRoom(user._id === loginUser._id);
        }
        
        
    },[greetingMessage, avatarImagePath, user])

    

    return (
        <div className="container">
            
            <div
                className={`speech-bubble${isMyRoom ? ' editable' : ''}${isEditing ? ' editing' : ''}`}
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
            
            <img src={avatarImagePath} alt="avatar" />
        </div>
    )
}

export default Avatar;