import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import "../styles/Avatar.css";
import MyAvatarList from "../components/MyAvatar";
import ShopAvatarList from "../components/AvatarShop";
import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { getMyAvatarImagePath } from "../api/avatar";
import GotoMyRoomButton from "../components/GotoMyRoomButton";


const AvatarPage = () => {
    const value = localStorage.getItem("USER");
    const navigate = useNavigate();
    if (value == null) {
        navigate("/");
    }
    const user = JSON.parse(value);
    const [myAvatarImagePath, setMyAvatarImagePath] = useState("");
    useEffect(() => {
        getUser(user.name)
        .then(({ data }) => {
            localStorage.setItem("USER", JSON.stringify(data))
        }).catch((e) => {
            console.log(e);
        })
        getMyAvatarImagePath(user._id).then(({data}) => {
            setMyAvatarImagePath(data.avatarImagePath);
        })
    }, []);

    return (
        <main className="avatar-page-main">
            <div className="left-section">
                <UserInfo user={user} />
                <div className = "image-wrapper">
                    <img src={myAvatarImagePath} alt="Description" />
                </div>
            </div>
            <div className="right-section">
                <div>
                    <GotoMyRoomButton />
                </div>
                <div>
                    <MyAvatarList userId={user._id} />
                    <ShopAvatarList userId = {user._id} />
                </div>
            </div>
        </main>
    )
}

export default AvatarPage;