import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../api/user";
import { getRoom } from "../api/room";
import UserInfo from "../components/UserInfo";
import FindUser from "../components/FindUser";
import CommentList from "../components/CommentList";
import CherryRank from "../components/CherryRank";
import LogoutButton from "../components/LogoutButton";
import NotFoundPage from "./NotFoundPage";
import CherryDonateButton from "../components/CherryDonateButton";
import MusicPlayer from "../components/Music";
import RoomCanvas from "../components/RoomCanvas"
import GotoMyRoomButton from "../components/GotoMyRoomButton";
import "../styles/Room.css";


const RoomPage = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const value = localStorage.getItem("USER");
    const navigate = useNavigate();
    const loginUser = value === null ? value : JSON.parse(value);
    const [user, setUser] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const isMyRoom = name === null || (user != null && user.name === loginUser.name);
    let finalName = null;
    if (name != null) finalName = name;
    else if (loginUser != null && loginUser.name) finalName = loginUser.name;
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
    useEffect(() => {
        if (user != null) {
            getRoom(user._id).then(({ data }) => {
                setRoomId(data._id)
            })
        }
    }, [user])
    if (!isMyRoom && user === null) {
        return (
            <NotFoundPage />
        )
    }
    return (
        <main>
            <div className="left-section">
                <UserInfo user={(value != null && name == null) ? loginUser : user} isMyRoom={isMyRoom} />
                <RoomCanvas roomId={roomId} />
                <div className="room-music-box">
                    <MusicPlayer />
                </div>
                {isMyRoom && (
                    <div className="room-button-box">
                        <button className="white-box" onClick={() => navigate("/room/decoration")}>
                            <span className="room-bg" />
                            방꾸미기
                        </button>
                        <button className="white-box" onClick={() => navigate("/room/avatar")}>
                            <span className="avatar-bg" />
                            아바타
                        </button>
                    </div>
                )}    
            </div>
            <div className="right-section">
                <div className="top-row">
                    {!isMyRoom ? <GotoMyRoomButton /> : <span></span>}
                    <LogoutButton />
                </div>
                <div>
                    <FindUser />
                    <CommentList user={user}/>
                    <CherryRank user={user}/>
                    {!isMyRoom &&  <CherryDonateButton />}
                </div>
            </div>
        </main>
    )
}

export default RoomPage;