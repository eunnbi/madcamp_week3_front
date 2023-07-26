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
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../utils/auth";
import { CircularProgress } from "@mui/material";

const RoomDecorationPage = () => {
    const loading = useRecoilValue(saveLoading);
    const loginUser = getLoggedInUser();
    const navigate = useNavigate();
    if (loginUser == null) {
        navigate("/");
    }
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await getUser(loginUser.name);
            return data;
        },
        initialData: loginUser
    })
    const { data: room } = useQuery({
        queryKey: ["roomId"],
        queryFn: async () => {
            const { data } = await getRoom(loginUser._id);
            return data;
        }
    })
    return (
        <main>
            <div className="left-section">
                <UserInfo user={user || null} />
                <div className="room-canvas-wrapper">
                    <RoomCanvas roomId={room ? room._id : null} />
                </div>
            </div>
            <div className="right-section">
                <div className="top-row">
                    <GotoMyRoomButton />
                    <RoomSaveButton roomId={room ? room._id : null} />
                </div>
                <div>
                    <FurnitureList user={user} />
                    <FurnitureShop user={user} />
                </div>
            </div>
            <div className={loading ? "loading" : "loading hidden"}>
                <CircularProgress color="inherit" />
            </div>
        </main>
    )
}

export default RoomDecorationPage;