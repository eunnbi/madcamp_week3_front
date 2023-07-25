import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GotoMyRoomButton from "../components/GotoMyRoomButton";
import UserInfo from "../components/UserInfo";
import FurnitureShop from "../components/FurnitureShop";
import FurnitureList from "../components/FurnitureList";
import { getUser } from "../api/user";
import RoomCanvas from "../components/RoomCanvas";
import RoomSaveButton from "../components/RoomSaveButton";
import "../styles/Room.css"
import { getRoom } from "../api/room";
import { useRecoilValue } from "recoil";
import { saveLoading } from "../store/furniture";

const RoomDecorationPage = () => {
    const loading = useRecoilValue(saveLoading);
    const value = localStorage.getItem("USER");
    const navigate = useNavigate();
    if (value == null) {
        navigate("/");
    }
    const [user, setUser] = useState(JSON.parse(value));
    const [roomId, setRoomId] = useState(null);
    useEffect(() => {
        getUser(user.name)
        .then(({ data }) => {
            setUser(data);
        }).catch((e) => {
            console.log(e);
        })
        getRoom(user._id).then(({ data }) => {
            setRoomId(data._id)
        })
    }, []);
    return (
        <main>
            <div className="left-section">
                <UserInfo user={user} />
                <div className="room-canvas-wrapper">
                    <RoomCanvas roomId={roomId} />
                </div>
            </div>
            <div className="right-section">
                <div className="top-row">
                    <GotoMyRoomButton />
                    <RoomSaveButton roomId={roomId} />
                </div>
                <div>
                    <FurnitureList user={user} />
                    <FurnitureShop user={user} />
                </div>
            </div>
            <div className={loading ? "loading" : ""}></div>
        </main>
    )
}

export default RoomDecorationPage;