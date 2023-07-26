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
import CommentForm from "../components/CommentForm";
import GotoMyRoomButton from "../components/GotoMyRoomButton";
import Avatar from "../components/Avatar";
import "../styles/Room.css";
import { getLoggedInUser } from "../utils/auth";
import { useQuery } from "@tanstack/react-query";


const RoomPage = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const navigate = useNavigate();
    const loginUser = getLoggedInUser();
    let finalName = null;
    if (name != null) finalName = name;
    else if (loginUser != null && loginUser.name) finalName = loginUser.name;
    if (loginUser === null || finalName === null) {
        navigate("/");
    }
    const { data: user } = useQuery({
        queryKey: ["user", finalName],
        queryFn: async () => {
            try {
                const { data } = await getUser(finalName);
                return data;
            }
            catch(e) {
                console.log(e);
                return null;
            }
            
        },
    })
    const { data: room } = useQuery({
        queryKey: ["room", user],
        queryFn: async () => {
            if (user != null) {
                const { data } = await getRoom(user._id);
                return data;
            }
            else return null;
        }
    })
    const isMyRoom = name === null || (user != null && user.name === loginUser.name);
    if (!isMyRoom && user === null) {
        return (
            <NotFoundPage />
        )
    }
    return (
        <main>
            <div className="left-section">
                <UserInfo user={user || null} isMyRoom={isMyRoom} />
                <div className="room-canvas-wrapper">
                    <RoomCanvas roomId={room ? room._id : null} draggable={false} />
                    <div className="room-avatar-wrapper">
                        <Avatar user={user || null} room={room || null} isMyRoom={isMyRoom}/>
                    </div>
                </div>
                <div className="bottom-box">
                    <div className="room-music-box">
                        <MusicPlayer />
                    </div>
                    {isMyRoom ? (
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
                    ) : <CommentForm roomId={room ? room._id : null} authorId={loginUser._id} userId={user ? user._id : null} />}  
                </div>
            </div>
            <div className="right-section">
                <div className="top-row">
                    {!isMyRoom ? <GotoMyRoomButton /> : <span></span>}
                    <LogoutButton />
                </div>
                <div>
                    <FindUser />
                    <CommentList user={user || null}/>
                    <CherryRank user={user || null} />
                    {!isMyRoom &&  <CherryDonateButton userId={user ? user._id : null} sponsorId={loginUser._id} />}
                </div>
            </div>
        </main>
    )
}

export default RoomPage;