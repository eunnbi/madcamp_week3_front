import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../api/user";
import UserInfo from "../components/UserInfo";
import FindUser from "../components/FindUser";
import CommentList from "../components/CommentList";
import CherryRank from "../components/CherryRank";
import LogoutButton from "../components/LogoutButton";
import NotFoundPage from "./NotFoundPage";
import CherryDonateButton from "../components/CherryDonateButton";

import "../styles/Room.css";


const RoomPage = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const value = localStorage.getItem("USER");
    const navigate = useNavigate();
    const loginUser = value === null ? value : JSON.parse(value);
    const [user, setUser] = useState(null);
    const isMyRoom = name === null || (user != null && user.name === loginUser.name);
    let finalName = null;
    if (name != null) finalName = name;
    else if (loginUser != null && loginUser.name) finalName = loginUser.name;
    const goToMyRoom = () => {
        navigate("/room");
    }
    useEffect(() => {
        if (value === null) {
            navigate('/');
        }
        else if (finalName) {
            getUser(finalName)
            .then(({ data }) => {
                setUser(data);
            }).catch((e) => {
                console.log(e);
                setUser(null);
            })
        }
        else {
            navigate("/")
        }
    }, [finalName]);
    if (!isMyRoom && user === null) {
        return (
            <NotFoundPage />
        )
    }
    return (
        <main>
            <div className="left-section">
                <UserInfo user={user} isMyRoom={isMyRoom} />
                {isMyRoom && (
                    <div className="room-button-box">
                        <button className="white-box"><span className="room-bg" />방꾸미기</button>
                        <button className="white-box"><span className="avatar-bg" />아바타</button>
                    </div>
                )}
            </div>
            <div className="right-section">
                <div className="top-row">
                    {!isMyRoom ? <button className="back-button" onClick={goToMyRoom}><span className="chevron-right" /></button> : <span></span>}
                    <LogoutButton />
                </div>
                <div>
                    <FindUser />
                    <CommentList />
                    <CherryRank />
                    {!isMyRoom &&  <CherryDonateButton />}
                </div>
            </div>
        </main>
    )
}

export default RoomPage;